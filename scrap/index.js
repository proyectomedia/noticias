var cheerio = require('cheerio');
var Promise = require('bluebird');
var _ = require('lodash');

var request = require("../lib/requestAsync");
var config = require("../config");
var scrapData = require("../lib/scrapData");
var generateId = require('../lib/generateId');


module.exports = function() {

    var promises = [];

    var pages = config.pages.filter(page => page.active);

    return Promise.map(pages, configPage => {

        var method = configPage.verb.toLowerCase() + "Async";

        return request[method](configPage.url)
            .then(html => {

                var $;
              if (configPage.format === 'json') {

                    $ = JSON.parse(html.body)

                } else {

                    $ = cheerio.load(html.body);

                }

                var scrapper = require(`./scrappers/${configPage.scrapper}`);

                return scrapData(scrapper($, configPage))
                    .then(data => data.map(newsItem => {
                        
                        //Assign default properties
                        newsItem = generateId(Object.assign((configPage.defaults || {}),  newsItem));
                        
                        //Debugging mode
                        if(configPage.debug) 
                        {
                            console.log(newsItem);
                        }

                        return newsItem;
                    }))

            })
            .catch(console.error);

    })
    .then(newsPerPage =>
        newsPerPage
        .reduce((news, pageNews) => news.concat(pageNews ? _.flatten(pageNews) : []) , [])
    );

}
