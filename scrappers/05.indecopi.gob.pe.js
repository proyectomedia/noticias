var cheerio = require("cheerio");

var request = require("../lib/requestAsync");
var util = require('../lib/util');

module.exports = function scrapper($, config) {

    return $("div.Lista_Noticia")
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};
            var titleNew = $(post).find("div.Lst_Not_Title");

            data.institution = "Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual";

            data.title = titleNew.find('h5').text().trim();
            data.url = titleNew.find("a").attr("href");

            return request
                .getAsync(data.url)
                .then(html => {

                    var _new = cheerio.load(html.body)('div.Noticia_Interna');
                    var $ = cheerio.load(_new.html());

                    data.subtitle = $('div.Noticia_IntIntro').text().trim();
                    data.date = util.getDate($('div.Noticia_IntDate').text().trim(), 'YYYY/MM/DD');
                    data.imageUrl = util.getAbsoluteUrl(config.url, $('div.Noticia_Int_ContImag').find('img').attr('src'));
                    data.source = "INDECOPI";
                    data.content = $("div.Noticia_IntContenido").html();

                    return data;
                })
                .catch(console.error);

        }).get()

}

