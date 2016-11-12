var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('div.post-panel')
        .slice(0, config.limit)
        .map((i, post) => {

            var news = {};

            //data.date = util.getDate(imgDate.last().text().trim(), 'dddd, D [de] MMMM [del] YYYY');

            var title = $(post).find('h2.post-title');
            news.title = title.text().trim();
            var date = title.next()
            try {
                news.date = util.getDate(date.text().trim().split(',')[1], 'DD [de] MMMM [del] YYYY')
            }catch(e) {}

            news.subtitle = date.next().find('b').text().trim();
            news.content = $(post).find('div.copy p')                
                        .map((i, p) => {

                            if(($(p).text().trim() != $(date).text().trim()) && $(p).text().trim().length > 0) 
                            {
                                return $(p).text().trim()
                            }
                            return "";
                        })                        
                        .get()
                        .filter(t => t)
                        .join("\n\n");


            if (!news.subtitle) {

                news.subtitle = util.extractSummary(news.content);
            }

            news.url = $(post).find('.meta-list a').first().attr('href');
            news.imageUrl = "";
            news.files = [];

            return news;       

        }).get()

}

