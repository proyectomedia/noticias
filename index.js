var cheerio = require('cheerio');


var request = require("./lib/requestAsync");
var config = require("./config");
var scrapData = require("./lib/scrapData");

config.pages
    .filter(page => page.active)
    .forEach(configPage => {

        request
            .getAsync(configPage.url)
            .then(html => {

                var $;

                if (configPage.format === 'json') {

                    $ = JSON.parse(html.body)

                } else {

                    $ = cheerio.load(html.body);
                
                }

                var scrapper = require(`./scrappers/${configPage.scrapper}`);

                return scrapData(scrapper($, configPage))
                    .then(data => {

                        console.log(data);
                    });

            })
            .catch(err => {

                console.error(err);

            });

    });
