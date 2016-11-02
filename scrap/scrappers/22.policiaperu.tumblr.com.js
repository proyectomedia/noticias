var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('div.post-panel')
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};

            data.institution = "Policia Nacional";

            data.category = config.category;
            data.priority = config.priority;

            //data.date = util.getDate(imgDate.last().text().trim(), 'dddd, D [de] MMMM [del] YYYY');

            var title = $(post).find('h2.post-title');
            data.title = title.text().trim();
            var date = title.next()
            try {
                data.date = util.getDate(date.text().trim().split(',')[1], 'DD [de] MMMM [del] YYYY')
            }catch(e) {}

            data.subtitle = date.next().find('b').text().trim();

            if (!data.subtitle) {

                data.subtitle = util.extractSummary(date.next().text().trim())
            }

            data.url = $(post).find('.meta-list a').first().attr('href');

            return data;       

        }).get()

}

