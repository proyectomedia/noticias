/*
    Review Date: 2016-11-07
    Reviewer: Kellerman Rivero.
*/
var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("div.cuerponoticias")
        .slice(0, config.limit)
        .map((i, post) => {

            var news = {};
            var titleNew = $(post).find("div.titulonoticias");
            var aTitle = titleNew.find('a');
            var postUrl = util.resolveUrl(config.url, aTitle.attr("href"));

            news.title = aTitle.text().trim();
            news.subtitle = $(post).find('.noticia').children().remove().end().text().trim();
            news.date = util.getDate(titleNew.find('span[style]').text().trim(), 'DD/MM/YYYY');
            news.url = postUrl;

            return request
                .getAsync(postUrl)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var content = "";

                    $("div#contenido")
                        .find("p[style='text-align: justify;']")
                        .each(function() {
                            content += $(this).text() + "\n";
                        })
                    
                    news.content = content;
                    news.imageUrl = "";
                    news.files = [ util.resolveUrl(config.url, $("div#contenido").find('a.more').attr('href')) ]

                    return news;
                })
                .catch(console.error);

        }).get()
}

