var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('article.post-content section.media')
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};

            data.institution = "MINISTERIO DE JUSTICIA";

            data.category = config.category;
            data.priority = config.priority;
            var ps = $(post).find('p');
            var title = ps.filter('.search-text-title').find('a');
            data.title = title.text().trim();
            data.date = util.getDate(ps.find('time').attr('datetime'), 'YYYY-MM-DD[T]HH:mm');
            data.subtitle = ps.last().text().trim();
            data.url = title.attr('href');
            data.source = data.institution

            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    data.imageUrl = $('article.post-content img').first().attr('src');

                    return data;
                })
                .catch(console.error);         

        }).get()

}

