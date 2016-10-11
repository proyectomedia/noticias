var cheerio = require("cheerio");

var generateId = require('../lib/generateId');
var util = require('../lib/util');

module.exports = function scrapper($, config) {

    return $
        .slice(0, config.limit)
        .map(rawData => {
            
            var data = {};

            data.institution = "Comisión de Promoción del Perú para la Exportación y el Turismo";
            data.source = "Comisión de Promoción del Perú para la Exportación y el Turismo";
            data.imageUrl = util.getAbsoluteUrl(config.url, "Repos", rawData.url_imagen);
            data.title = rawData.titulo;
            data.date = rawData.fecha_novedad;
            data.content = rawData.descripcion.trim();
            data.files = [ util.getAbsoluteUrl(config.url, "Repos", rawData.link) ]
            data.subtitle = util.extractSummary(data.content);

            data = generateId(data);
            data.config = config;

            return Promise.resolve(data);

        });

}

