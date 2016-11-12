var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('div.conten div.items-row')
        .slice(0, config.limit)
        .map((i, post) => {

            var news = {};
            var title = $(post).find('h2 a');

            news.title = title.text().trim();
            news.imageUrl = util.getAbsoluteUrl(config.url, $(post).find('p img').first().attr('src'));
            news.subtitle = $(post).find('p.readmore').prev().text().trim();
            news.url = util.getAbsoluteUrl(config.url, title.attr('href'));

            return request
                .getAsync(news.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    $('div.item-page p').get().some(p => {

                        try {

                            var text = $(p).text().trim();

                            if (/\d{2} de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre) de \d{4}$/gi.test(text)) {
                                news.date = util.getDate(text.split(',')[1], 'DD [de] MMMM de YYYY');
                                return true;
                            }

                        } catch(e) {}
                    });

                     news.content = $('div.item-page p')                
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

