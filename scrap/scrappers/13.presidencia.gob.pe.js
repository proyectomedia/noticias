var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("div.views-row")
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};

            data.institution = "PRESIDENCIA";

            data.category = config.category;
            data.priority = config.priority;

            var title = $(post).find('div.noticia_home_titulo h1 a');

            data.title = title.text().trim();
            data.url = util.getAbsoluteUrl(config.url, title.attr('href'));
            data.date = util.getDate($(post).find('strong span[property="dc:date"]').attr('content'));

            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    data.imageUrl = $('div.noticia_imagen img').attr('src');
                    data.source = data.institution;
                    data.subtitle = $('div.noticia_contenido p em').first().text().trim();

                    return data;
                })
                .catch(console.error);

        }).get()

}

