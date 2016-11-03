var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');
var moment = require('moment');

module.exports = function scrapper($, config) {

    return $('table div.carPrensa')
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};

            data.institution = "Ministerio del Interior";

            data.category = config.category;
            data.priority = config.priority;

            var day = $(post).find('div.noticia_fecha_dia').text().trim();
            var month = $(post).find('div.noticia_fecha_mes__').text().trim();

            data.date = util.getDate(`${day}-${getMonth(month)}-${moment().year()}`.toLowerCase(), 'DD-MM-YYYY');
            data.subtitle = $(post).find('div.noticia_fecha_mes_').text().trim();

            var title = $(post).find('div.link_noticia');
            data.title = title.text().trim();
            try {
                var url = /href='(.*)'/gi.exec(title.attr('onclick'))[1];
                data.url = util.getAbsoluteUrl(config.url, url);
            } catch(e) {
                return Promise.resolve();
            }
            
            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    data.imageUrl = $('td[align="center"] img').first().attr('src');
                    data.source = data.institution;

                    return data;
                })
                .catch(console.error);   

        }).get()

}

function getMonth(month) {

    switch(month.toUpperCase()) {
        case 'ENE': return '01';
        case 'FEB': return '02';
        case 'MAR': return '03';
        case 'ABR': return '04';
        case 'MAY': return '05';
        case 'JUN': return '06';
        case 'JUL': return '07';
        case 'AGO': return '08';
        case 'SET': return '09';
        case 'OCT': return '10';
        case 'NOV': return '11';
        case 'DIC': return '12';
    }
}

