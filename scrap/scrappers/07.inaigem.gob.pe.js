var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("article.sermon")
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};
            var titleNew = $(post).find("header.post-title");

            data.institution = "Ministerio del Ambiente";

            data.category = config.category;
            data.priority = config.priority;

            data.title = titleNew.find('h3').text().trim();
            data.url = titleNew.find("a").attr("href");
            data.date = util.getDate(titleNew.find('span.meta-data').text(), 'YYYY-MM-DD h:m:s');
            data.subtitle = $('.post-content').find('.col-md-8 p').first().text().trim();

            return request
                .getAsync(data.url)
                .then(html => {

                    var _new = cheerio.load(html.body)('article.post-content');
                    var $ = cheerio.load(_new.html());

                    data.categoryNew = $('span.meta-data span').last().find('a').text().trim();
                    data.imageUrl = $('div.featured-image').find('img').attr('src');
                    data.source = "INAIGEM";

                    var content = $("<div></div>");

                    $('p')
                        .not('.r-texto')
                        .each(function() {
                            content.append(this);
                        });
                    
                    data.content = content.html();

                    return data;
                })
                .catch(console.error);

        }).get()

        

}

