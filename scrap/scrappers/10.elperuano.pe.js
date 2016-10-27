var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("div.seccionportada h1 a, ul li.marco a")
        .slice(0, config.limit)
        .map((i, link) => {

            var data = {};

            data.institution = "El Peruano";

            data.category = config.category;
            data.priority = config.priority;

            data.title = $(link).text().trim();
            data.url = util.getAbsoluteUrl(config.url, $(link).attr('href'));

            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var portada = $('div.seccionportada');

                    data.imageUrl = portada.find('img').attr('src');
                    data.source = "El Peruano";

                    data.subtitle = portada.find('p').text().trim();

                    var texto = $('article.notatexto');

                    data.date = util.getDate(texto.find('p').first().text().trim(), 'DD/MM/YYYY');
                    

                    data.content = texto
                        .find('p, .sumilla')
                        .map((i, p) => {
                            if (i > 0) {
                                return $(p).text().trim();
                            }
                        })
                        .get()
                        .filter(t => t)
                        .join("\n\n");

                    return data;
                })
                .catch(console.error);

        }).get()

}

