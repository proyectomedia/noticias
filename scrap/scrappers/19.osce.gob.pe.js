var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('table.views-table tbody tr')
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};

            data.institution = "Organismo de Contrataciones del Estado";

            data.category = config.category;
            data.priority = config.priority;

            var title = $(post).find('a');
            data.title = title.text().trim();
            data.date = util.getDate($(post).find('td.views-field-created').text().trim(), 'DD/MM/YYYY');
            //data.subtitle = ps.last().text().trim();
            data.url = util.getAbsoluteUrl(config.url, title.attr('href'));
            //data.source = data.institution

            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var  content = $('div.content.clearfix')

                    data.imageUrl = content.find('img').first().attr('src');
                    data.source = data.institution;
                    data.subtitle = content.find('[property="content:encoded"] ul li').text().trim()

                    return data;
                })
                .catch(console.error);         

        }).get()

}

