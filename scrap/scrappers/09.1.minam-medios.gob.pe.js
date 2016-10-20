var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("div.box_post li.clearfix")
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};
            
            data.institution = "Ministerio del ambiente";

            data.category = config.category;
            data.priority = config.priority;

            var title = $(post).find('div.span_14 h3');

            data.title = title.text().trim();
            data.url = title.find('a').attr("href");
            data.subtitle = title.nextAll('p').text().trim();        

            return request
                .getAsync(data.url)
                .then(html => {

                    var _new = cheerio.load(html.body)('div.box_post');
                    var $ = cheerio.load(_new.html());

                    var fecha = $('#fecha');

                    data.date = util.getDate(fecha.text().trim(), 'YYYY-MM-DD');
            
                    data.videoUrl = $("iframe[src*='youtube']").attr("src");
                    data.source = "MINAM";

                    data.content = fecha
                        .nextAll('p[style]')
                        .map((i, p) => $(p).text().trim())
                        .get()
                        .filter(t => t)
                        .join("\n\n");

                    return data;
                })
                .catch(console.error);

        }).get()

        

}

