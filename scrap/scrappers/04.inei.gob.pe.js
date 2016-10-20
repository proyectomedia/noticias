var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("div.cuerponoticias")
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};
            var titleNew = $(post).find("div.titulonoticias");
            var aTitle = titleNew.find('a');

            data.institution = "Instituto Nacional de Estadística e Informática";

            data.title = aTitle.text().trim();
            data.subtitle = $(post).find('.noticia').children().remove().end().text().trim();
            data.date = util.getDate(titleNew.find('span[style]').text().trim(), 'DD/MM/YYYY');
            data.url = util.getAbsoluteUrl(config.url, aTitle.attr("href"));

            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var content = $("<div></div>");

                    $("div#contenido")
                        .find("p[style='text-align: justify;']")
                        .each(function() {
                            content.append(this);
                        })
                    
                    data.content = content.html();
                    data.files = [ util.getAbsoluteUrl(config.url, $("div#contenido").find('a.more').attr('href')) ]

                    return data;
                })
                .catch(console.error);

        }).get()

}

