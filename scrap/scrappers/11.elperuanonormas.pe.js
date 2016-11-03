var cheerio = require("cheerio");
var moment = require('moment');
var Promise = require('bluebird');

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return [request.postAsync({
            url: `${config.url}/Filtro`,
            form: {
                cddesde: moment().format('DD/MM/YYYY'),
                cdhasta: moment().format('DD/MM/YYYY')
            }
        })
        .then(html => {

            $ = cheerio.load(html.body);

            var elements = $('article.edicionesoficiales_articulos')
                .slice(0, config.limit)
                .get();

            return Promise.map(elements, post => {

                var data = {};

                data.institution = "El Peruano";

                data.category = config.category;
                data.priority = config.priority;

                var title = $(post).find('h5 a');

                data.title = title.text().trim();
                data.url = title.attr('href');
                data.date = util.getDate($(post).find('p b').first().text().trim(), 'DD/MM/YYYY');
                data.subtitle = $(post).find('p').last().text().trim();

                return data;

            })

        })];

}

