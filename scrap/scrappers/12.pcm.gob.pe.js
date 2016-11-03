var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("div.post-holder.radius-full")
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};

            data.institution = "PCM";

            data.category = config.category;
            data.priority = config.priority;

            var title = $(post).find('h2.title a');

            data.title = title.attr('title');
            data.url = title.attr('href');
            data.date = util.getDate($(post).find('div.excerpt.radius-bottom small').first().text().trim(), 'MMMM D, YYYY');
            data.imageUrl = $('a.feature-img img').attr('src');
            data.source = data.institution;

            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    data.subtitle = $('ul li strong').first().text().trim();

                    return data;
                })
                .catch(console.error);

        }).get()

}

