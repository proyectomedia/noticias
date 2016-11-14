var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("article.seccion, article.seccion5")
        .slice(0, config.limit)
        .map((i, post) => {

            var postUrl = util.getAbsoluteUrl(config.url, 'agencia', $(post).find('h2 a, h3 a').first().attr('href'));

            return request
                .getAsync(postUrl)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var news = {};

                    news.title =  $('h1').text().trim();
                    var string = $('h1 ~ h4').text().trim();
                    news.subtitle = string+ "...";
                    news.imageUrl = $('article.fotoportada img').attr('src');
                    news.date = util.getDate($('section.cuerpo_cont section font').text().trim(), 'HH:mm, MMM DD.');
                    news.url = postUrl;

                    news.content = $('section.cuerpo_cont section div:not(.social-detalle)')
                        .map((i, div) => {

                            if(($(div).find('div, br').length == 0) && ($(div).text().trim().length > 0))
                            {
                                return $(div).text().trim()
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
