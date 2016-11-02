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

                    data.content = $('div.item-page p').text().trim();

                    return data;
                })
                .catch(console.error);         

        }).get()

}

