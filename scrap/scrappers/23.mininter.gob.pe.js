var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('table.views-view-grid tr')
        .slice(0, config.limit)
        .map((i, post) => {

            var news = {};

            news.date = $(post).find('span[property="dc:date"]').attr('content')

            var title = $(post).find('span.title-list-note a');

            news.title = title.text().trim();
            news.url = util.getAbsoluteUrl(config.url, title.attr('href'));
            news.subtitle = $(post).find('div.content-list-note p').text().trim();
            
            return request
                .getAsync(news.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    news.imageUrl = $('section#post-content img').first().attr('src'); 
                    news.content = $('div.content div.field-item.even p')                      
                        .map((i, p) => {

                            if($(p).text().trim().length > 0) 
                            {
                                return $(p).text().trim()
                            }
                            return "";
                        })                        
                        .get()
                        .filter(t => t)
                        .join("\n\n");

                    news.files = [];

                    return news;
                })
                .catch(console.error);   

        }).get()

}

