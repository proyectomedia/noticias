var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('div.conten div.items-row')
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};

            data.institution = "Ministerio de educación";

            data.category = config.category;
            data.priority = config.priority;

            var title = $(post).find('h2 a');
            data.title = title.text().trim();
            data.imageUrl = util.getAbsoluteUrl(config.url, $(post).find('p img').first().attr('src'));
            data.source = data.institution;
            
            data.subtitle = $(post).find('p.readmore').prev().text().trim();
            data.url = util.getAbsoluteUrl(config.url, title.attr('href'));

            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    $('div.item-page p').get().some(p => {

                        try {

                            var text = $(p).text().trim();

                            if (/\d{2} de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre) de \d{4}$/gi.test(text)) {
                                data.date = util.getDate(text.split(',')[1], 'DD [de] MMMM de YYYY');
                                return true;
                            }

                        } catch(e) {}
                    });

                    return data;
                })
                .catch(console.error);         

        }).get()

}

