/*
    Review Date: 2016-11-07
    Reviewer: Kellerman Rivero.
*/
var cheerio = require("cheerio");

var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $
        .slice(0, config.limit)
        .map(rawData => {
            
            var news = {};

            news.imageUrl = util.getAbsoluteUrl(config.url, "Repos", rawData.url_imagen);
            news.title = rawData.titulo;
            news.date = util.getDate(rawData.fecha_novedad, "DD-MM-YYYY");
            news.content = rawData.descripcion.trim();
            news.files = [ util.getAbsoluteUrl(config.url, "Repos", rawData.link) ]
            news.subtitle = util.extractSummary(news.content);
            news.url = util.getAbsoluteUrl(config.url, "Repos", rawData.link);

            return Promise.resolve(news);
        });
}

