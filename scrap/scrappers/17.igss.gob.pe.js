var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('table#example tbody tr')
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};

            data.institution = "IGSS";

            data.category = config.category;
            data.priority = config.priority;
            var title = $(post).find('td a').last();
            data.title = title.text().trim();
            data.url = util.getAbsoluteUrl(config.url, title.attr('href'));

            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var content = $('article div.contenidoportal');

                    data.imageUrl = util.getAbsoluteUrl(config.url, content.find('img').first().attr('src'));
                    data.source = data.institution;
                    data.subtitle = content.find('p span strong').first().text().trim();

                    return data;
                })
                .catch(console.error);         

        }).get()

}

