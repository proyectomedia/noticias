var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('article.post-content section.media')
        .slice(0, config.limit)
        .map((i, post) => {

            var news = {};

            var ps = $(post).find('p');
            var title = ps.filter('.search-text-title').find('a');

            news.title = title.text().trim();
            news.date = util.getDate(ps.find('time').attr('datetime'), 'YYYY-MM-DD[T]HH:mm');
            news.subtitle = ps.last().text().trim();
            news.url = title.attr('href');
            news.files = [];

            return request
                .getAsync(news.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    news.imageUrl = $('article.post-content img').first().attr('src');                    
                    news.content = $('article.post-content p')                      
                        .map((i, p) => {

                            if($(p).find('script').length == 0 &&  $(p).text().trim().length > 0 && $(p).text().trim() != "0") 
                            {
                                return $(p).text().trim()
                            }
                            return "";
                        })                        
                        .get()
                        .filter(t => t)
                        .join("\n\n");

                    return news;
                })
                .catch(console.error);         

        }).get()

}

