var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('table.views-view-grid tr')
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};

            data.institution = "Ministerio del Interior";

            data.category = config.category;
            data.priority = config.priority;

            data.date = $(post).find('span[property="dc:date"]').attr('content')

            var title = $(post).find('span.title-list-note a');
            data.title = title.text().trim();
            data.url = util.getAbsoluteUrl(config.url, title.attr('href'));
            data.subtitle = $(post).find('div.content-list-note p').text().trim();
            
            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    data.imageUrl = $('section#post-content img').first().attr('src');
                    data.source = data.institution;

                    return data;
                })
                .catch(console.error);   

        }).get()

}

