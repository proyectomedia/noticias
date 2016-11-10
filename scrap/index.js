var cheerio = require('cheerio');
var bluebird = require('bluebird');
var Promise = bluebird;
var _ = require('lodash');

var request = require("../lib/requestAsync");
var config = require("../config");
var scrapData = require("../lib/scrapData");
var generateId = require('../lib/generateId');

var dbConfig = require('../lib/db');
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

var dot = require('mongo-dot-notation');
var flatten = dot.flatten;
var op = dot.Operators;

function invokeScrapper(scrapperId) {

    var promises = [];

    var pages = config.pages.filter(page => page.active && (scrapperId ? (page.scrapper == scrapperId) : true));

    return Promise.map(pages, configPage => {

        var method = configPage.verb.toLowerCase() + "Async";

        console.log("[Scrapping] Running scrapper: '" + scrapperId + "'");
        return request[method](configPage.url)
            .then(html => {
                
                console.log("[Scrapping] Response received for: '" + scrapperId + "' (" + configPage.url + ")");
                var $;

                if (configPage.format === 'json') {

                    $ = JSON.parse(html.body)

                } else {

                    $ = cheerio.load(html.body);

                }

                var scrapper = require(`./scrappers/${configPage.scrapper}`);

                return scrapData(scrapper($, configPage, html.body))
                    .then(data => data.reduce((news, pageNews) => {

                                        if(pageNews.length) //Array of news
                                        {
                                            news = news.concat(pageNews);
                                        }
                                        else //Single news
                                        {
                                            news.push(pageNews);
                                        } 

                                        return news;                                       
                                    }, [])
                                    .map(newsItem => {
                        
                                        //Assign default properties
                                        newsItem = generateId(Object.assign(newsItem, configPage.defaults || {}));
                                        
                                        //Debugging mode
                                        if(configPage.debug) 
                                        {
                                            console.log(newsItem);
                                        }

                                        return newsItem;
                                     }));

            })
            .catch(console.error);

    });
}

function* getRecentNews(limit) 
{
        limit = limit || 5;

        var db = yield MongoClient.connect(dbConfig.mongoUri);

        // Get the news collection
        var collection = db.collection('news');
        
        var news = yield collection
                        .find({
                            $or: [ { published: 0}, { published: { $exists: false } }]
                        })
                        .sort({ date : -1 })
                        .limit(limit)
                        .toArray();

        db.close();

        return news;
}

function* markAsPublished(news) {
        var db = yield MongoClient.connect(dbConfig.mongoUri);

        // Get the news collection
        var collection = db.collection('news');
        
        var publishedCount = (news.published || 0) + 1;
        var operation = yield collection.updateOne({ _id: news._id }, { $set: { published: publishedCount }});

        db.close();
}

function* fetchAndSave(scrapperId) {
        var db = yield MongoClient.connect(dbConfig.mongoUri);

        // Get the news collection
        var collection = db.collection('news');

        console.log("[FetchAndSave] Scrapper: " + scrapperId);
        var newsArray = yield invokeScrapper(scrapperId);
        var news = _.flatten(newsArray);

        for(var i = 0; i < news.length; i++)
        {
            var newsItem = news[i];

            newsItem.published = op.$setOnInsert(0);

            var mongoEntity = flatten(newsItem);

            var operation = yield collection.updateOne({ _id: newsItem._id }, mongoEntity, { upsert: true });

            if(operation.result.ok > 0) 
            {
                console.log("[FetchAndSave] Scrapper: " + scrapperId + ", Document: " + newsItem._id + " successfully " + (operation.result.nModified > 0 ? "updated" : "added"));
            }
            else 
            {
                console.log("[FetchAndSave] Scrapper: " + scrapperId + ", Document: " + newsItem._id + " cannot be saved in DB");
            }
        }

        db.close();
}


module.exports = {
    fetchAndSave: bluebird.coroutine(fetchAndSave),
    getRecentNews: bluebird.coroutine(getRecentNews),
    markAsPublished: bluebird.coroutine(markAsPublished)
};