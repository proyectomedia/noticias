/*
    Review Date: 2016-11-07
    Reviewer: Kellerman Rivero.
    Improvements: 
        2016-11-07: Resolve absolute url of attached files.
*/

var cheerio = require("cheerio");
var url = require('url');
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("#listar")
        .find("table[width='100%'][border=0][cellspacing=3][cellpadding=0]")
        .slice(0, config.limit)
        .map((i, table) => {

            var childTable = $(table).find('table');
            var news = {};
        
            news.title = $(childTable).find(".texto_arial_plomo_n_11").text().trim();     
            news.date = $(childTable).find(".texto_arial_plomo_x3_10_negrita").text().trim();
            news.content = $(childTable).find(".contenido1").text().trim();
            news.imageUrl = $(table).find("img.TABLE_border4").attr('src');
            news.files = [ util.resolveUrl(config.url, $(childTable).find("a.texto_arial_plomo_x2_11_negrita").attr('href')) ];       
            news.subtitle = util.extractSummary(news.content);
            news.url = config.url;

            return Promise.resolve(news);

        }).get();
}

