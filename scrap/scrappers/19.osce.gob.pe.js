var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('table.views-table tbody tr')
        .slice(0, config.limit)
        .map((i, post) => {

            var news = {};

            var title = $(post).find('a');
            news.title = title.text().trim();
            news.date = util.getDate($(post).find('td.views-field-created').text().trim(), 'DD/MM/YYYY');
            news.url = util.getAbsoluteUrl(config.url, title.attr('href'));

            return request
                .getAsync(news.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var  content = $('div.content.clearfix')

                    news.imageUrl = content.find('img').first().attr('src');
                    news.subtitle = content.find('[property="content:encoded"] ul li').text().trim();

                    news.content = content.find("p")                
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

