var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('div.cont_not.txt_prensa_lista table')
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};

            data.institution = "Ministerio de Salud";

            data.category = config.category;
            data.priority = config.priority;

            var trs = $(post).find('tr');
            var imgDate = trs.first().find('td');

            data.date = util.getDate(imgDate.last().text().trim(), 'dddd, D [de] MMMM [del] YYYY');

            var title = $(trs[1]).find('a');
            data.title = title.text().trim();
            data.imageUrl = imgDate.find('td img').first().attr('src');
            data.source = data.institution;
            
            data.subtitle = $(trs[2]).text().trim();
            data.url = util.getAbsoluteUrl(config.url, title.attr('href'));

            return data;       

        }).get()

}

