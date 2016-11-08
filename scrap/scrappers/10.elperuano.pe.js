var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("div.seccionportada h1 a, ul li.marco a")
        .slice(0, config.limit)
        .map((i, link) => {

            var postUrl = util.getAbsoluteUrl(config.url, encodeURIComponent($(link).attr('href').replace(/(\r\n|\n|\r)/gm,"")));

            return request
                .getAsync(postUrl)
                .then(html => {
                    var $ = cheerio.load(html.body);

                    var portada = $('div.seccionportada');

                    var news = {};

                    news.title = $("h1").text().trim();
                    news.imageUrl = portada.find('img').attr('src');
                    news.subtitle = portada.find('p').text().trim();

                    var texto = $('article.notatexto');

                    news.date = util.getDate(texto.find('p').first().text().trim(), 'DD/MM/YYYY');

                    if (news.date === 'Invalid Date') 
                    {
                        news.date = util.getDate(texto.find('p').first().text().trim(), 'D/MM/YYYY');
                    }
                    
                    news.content = texto
                        .find('p, .sumilla')
                        .map((i, p) => {
                            if (i > 0) {
                                return $(p).text().trim();
                            }
                        })
                        .get()
                        .filter(t => t)
                        .join("\n\n");

                    news.url = postUrl;
                    news.files = [];

                    return news;
                })
                .catch(console.error);

        }).get()

}

