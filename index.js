var cheerio = require('cheerio');
var requestAsync = require("./lib/requestAsync");
var config = require("./config");

config.pages.forEach(configPage => {

    requestAsync
        .getAsync(configPage.url)
        .then(html => {

            var $ = cheerio.load(html.body);
            var scrapper = require(`./scrappers/${configPage.scrapper}`);
            scrapper
                .scrappData(configPage, $)
                .then(data => {

                    console.log(data);
                });

        })
        .catch(err => {

            console.error(err);

        });

});
