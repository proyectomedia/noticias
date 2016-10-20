var cheerio = require("cheerio");

var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $
        .slice(0, config.limit)
        .map(rawData => {
            
            var data = {};

            data.institution = "Comisión de Promoción del Perú para la Exportación y el Turismo";
            data.source = "Comisión de Promoción del Perú para la Exportación y el Turismo";
            data.imageUrl = util.getAbsoluteUrl(config.url, "Repos", rawData.url_imagen);
            data.title = rawData.titulo;
            data.date = util.getDate(rawData.fecha_novedad, "DD-MM-YYYY");
            data.content = rawData.descripcion.trim();
            data.files = [ util.getAbsoluteUrl(config.url, "Repos", rawData.link) ]
            data.subtitle = util.extractSummary(data.content);

            return Promise.resolve(data);

        });

}

