var cheerio = require("cheerio");
var url = require('url');


var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    //var baseUrl = url.parse(config.url);

    return $("#listar")
        .find("table[width='100%'][border=0][cellspacing=3][cellpadding=0]")
        .slice(0, config.limit)
        .map((i, table) => {

            var childTable = $(table).find('table');
            var data = {};

            data.institution = "Ministerio de vivienda, construcción y saneamiento";
            data.source = "Ministerio de vivienda, construcción y saneamiento";
            data.imageUrl = $(table).find("img.TABLE_border4").attr('src');
            data.title = $(childTable).find(".texto_arial_plomo_n_11").text().trim();
            data.date = $(childTable).find(".texto_arial_plomo_x3_10_negrita").text().trim();
            data.content = $(childTable).find(".contenido1").text().trim();
            data.files = [ $(childTable).find("a.texto_arial_plomo_x2_11_negrita").attr('href') ]
            data.subtitle = util.extractSummary(data.content);

            return Promise.resolve(data);

        }).get();

}

