var cheerio = require('cheerio');
var bluebird = require('bluebird');
var Promise = bluebird;
var _ = require('lodash');

var request = require("../lib/requestAsync");
var config = require("../config");
var scrapData = require("../lib/scrapData");
var generateId = require('../lib/generateId');
var util = require('../lib/util');
var moment = require('moment-timezone');

var dbConfig = require('../lib/db');
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

var dot = require('mongo-dot-notation');
var flatten = dot.flatten;
var op = dot.Operators;

function invokeScrapper(url) {

    var promises = [];

    var pages = config.pages.filter(page => page.active && (url ? (page.url == url) : true));

    return Promise.map(pages, configPage => {

        var method = configPage.verb.toLowerCase() + "Async";

        console.log("[Scrapping] Running scrapper: '" + url + "'");
        return request[method](configPage.url)
            .then(html => {

                console.log("[Scrapping] Response received for: '" + configPage.scrapper + "' (" + configPage.url + ")");

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

function* updatecategories(limit){
try{
  limit = limit || 5;
  var db = yield MongoClient.connect(dbConfig.mongoUri);

  var collection = db.collection(dbConfig.collection);
  var sortIndex = { };
  //sortIndex['published.' + 'actualidad'] = 1;
  var sort={ 'published.actualidad':1, priority: -1, date: -1  };
  _.assign(sortIndex,sort)
 collection.createIndex(sortIndex);
 var categoriesQueryClause = { categories: { $in: [ 'actualidad' ]}};
 var isalgoritmo = { algorithm: {$exists:'true'} };
 var news = yield collection
                 .find({
                     $and: [
                         categoriesQueryClause,
                         isalgoritmo

                     ]
                 })
                 .sort(sortIndex)
                 .limit(limit)
                 .toArray();

  for (i in news){
    var text = news[i].title+news[i].content;
    var categoria=yield util.findcategory(text);
    console.log("entro a monkeylearn:"+news[i].title+", Monkeylearn selecciono : "+categoria);
    var categorias= categoria.split("-");
    console.log("insertar en categoria:"+categorias[0]);
    var updatecategory={categories:{}};
  console.log("falta registrar en bd");


    // var operation = yield collection.find({
    //   $and: [
    //    {_id: news[i]._id},
    //    {categories:{$nin:[categorias[0]]}}
    //     ]
    //   })
    //  .update({ $push:updatecategory)};
    //   .toArray();
    // console.log(JSON.stringify(operation.title, {indent: true}));





  };

 db.close();


}
catch(err){
   console.log(err);
}
}

function* getRecentNews(limit, category)
{
  try{
        limit = limit || 5;
        category = category || "politica";

        var db = yield MongoClient.connect(dbConfig.mongoUri);

        // Get the news collection
        var collection = db.collection(dbConfig.collection);

        var sortIndex = { };
         sortIndex['published.' + category] = 1;
        var sort={ priority: -1, date: -1  };
      //  sortIndex = { priority: -1, date: -1  };
         _.assign(sortIndex,sort)
        console.log(sortIndex);

        collection.createIndex(sortIndex);
        var b=moment().format();
        var c=moment().add(1, 'days').format();
        var d=moment().add(-1, 'days').format();
        var rangedate = { date: {$gte:d,$lt:c}}
        var categoriesQueryClause = { categories: { $in: [ category ]}};

        var publishedQueryClause = { };
        publishedQueryClause['published.' + category] = { $lte: 3 };

        var news = yield collection
                        .find({
                            $and: [
                                categoriesQueryClause,
                                publishedQueryClause,
                                rangedate
                            ]
                        })
                        .sort(sortIndex)
                        .limit(limit)
                        .toArray();

        db.close();

        return news;
      }
      catch(err){

         console.log(err);
      }
}

function* markAsPublished(news, category) {

   try{
        var db = yield MongoClient.connect(dbConfig.mongoUri);

        // Get the news collection
        var collection = db.collection(dbConfig.collection);

        var updateObject = {
            published: {

            }
        };



       var valor=(news.published && (news.published[category]>=0))
      // console.log(valor);
        if(valor){
         updateObject.published[category]=news.published[category] + 1;
      //   console.log("");
      //    console.log(updateObject);
         var query = flatten(updateObject);
      //   console.log(JSON.stringify(query));
         var operation = yield collection.updateOne({ _id: news._id }, query);

       };



        db.close();
}
catch(err){

   console.log(err);
}

}

function* fetchAndSave(scrapperId) {

try{
        var db = yield MongoClient.connect(dbConfig.mongoUri);

        // Get the news collection
        var collection = db.collection(dbConfig.collection);

        console.log("[FetchAndSave] Scrapper: " + scrapperId);
        var newsArray = yield invokeScrapper(scrapperId);
        var news = _.flatten(newsArray);

        for(var i = 0; i < news.length; i++)
        {
            var newsItem = news[i];
            var title=util.fixedparrafo(newsItem.title);
            var subtitle=util.fixedparrafo(newsItem.subtitle);
            var content=util.fixedparrafo(newsItem.content);

            //console.log(title);
          //  console.log(subtitle);
          //  console.log(content);

            newsItem.title=title;
            newsItem.subtitle=subtitle;
            newsItem.content=content;

            newsItem.published = {};
            newsItem.categories.forEach(e => newsItem.published[e] = op.$setOnInsert(0));

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
        return news;
    }
      catch(err){

         console.log(err);
      }



}


module.exports = {
   updatecategories: bluebird.coroutine(updatecategories),
    fetchAndSave: bluebird.coroutine(fetchAndSave),
    getRecentNews: bluebird.coroutine(getRecentNews),
    markAsPublished: bluebird.coroutine(markAsPublished)
};
