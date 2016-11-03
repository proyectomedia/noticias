var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("article.seccion, article.seccion5")
        .map((i, post) => {

            var data = {};

            data.institution = "Andina";

            data.category = config.category;
            data.priority = config.priority;

            var title = $(post).find('h2 a, h3 a').first();
            var subtitle = $(post).find('h4');

            date = subtitle.children().text().replace(/\.[^,]+/i, "");

            data.title = title.text().trim();
            data.url = util.getAbsoluteUrl(config.url, 'agencia', title.attr('href'));
            data.subtitle = subtitle.text().slice(subtitle.children().text().length).trim();
            data.date = util.getDate(date, 'HH:mm, MMM DD.');

            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    data.imageUrl = $('article.fotoportada img').attr('src');
                    data.source = $('div.fotoleyenda font').text().trim();

                    return data;
                })
                .catch(console.error);

        }).get()

}

