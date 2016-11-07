var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("div.noticia")
        .slice(0, config.limit)
        .map((i, post) => {

            var postUrl = util.getAbsoluteUrl(config.url, $(post).find('.fecha').next().attr("href"));            
            var news = {};

            news.date = util.getDate($(post).find('.fecha').text().trim(), 'MMMM DD, YYYY');


            return request
                .getAsync(postUrl)
                .then(html => {

                    var $ = cheerio.load(html.body);
                    
                    news.title = $('div.cont-titulo-mas').text().trim();                    
                    news.imageUrl = $("div.cont-descripcion-mas-1 img").attr("src");
                    news.content = $('div.cont-descripcion-mas-1')
                        .find('p')
                        .map((i, p) => $(p).text().trim())
                        .get()
                        .filter(t => t)
                        .join("\n\n");

                    news.url = postUrl;
                    news.subtitle = util.extractSummary(news.content);
                    news.files = []; 

                    return news;
                })
                .catch(console.error);

        }).get()

        

}

