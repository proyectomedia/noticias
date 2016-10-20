var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("div.noticia")
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};
            
            data.institution = "Servicio Nacional de Áreas Naturales Protegidas por el Estado";

            data.category = config.category;
            data.priority = config.priority;

            data.subtitle = $(post).find('.textonoticia').text().trim();
            data.date = util.getDate($(post).find('.fecha').text().trim(), 'MMMM DD, YYYY');
            data.url = util.getAbsoluteUrl(config.url, $(post).find('.fecha').next().attr("href"));
            data.imageUrl = $(post).find('div.contendor-img-noticia img').attr('src');
            data.source = "SERNANP";         

            return request
                .getAsync(data.url)
                .then(html => {

                    var _new = cheerio.load(html.body)('div.cont-noticia-mas');
                    var $ = cheerio.load(_new.html());

                    data.title = $('div.cont-titulo-mas').text().trim();

                    data.content = $('div.cont-descripcion-mas-1')
                        .find('p')
                        .map((i, p) => $(p).text().trim())
                        .get()
                        .filter(t => t)
                        .join("\n\n");

                    return data;
                })
                .catch(console.error);

        }).get()

        

}

