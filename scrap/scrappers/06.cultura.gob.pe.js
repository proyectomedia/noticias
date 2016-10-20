var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("li#categoria-1 div.node-noticia")
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};
            
            data.institution = "Ministerio de cultura";

            data.category = config.category;
            data.priority = config.priority;

            var title = $(post).find('div[property="dc:title"]');

            data.title = title.text().trim();
            data.url = util.getAbsoluteUrl(config.url, title.find('a').attr("href"));      

            return request
                .getAsync(data.url)
                .then(html => {

                    var _new = cheerio.load(html.body)('div.node-noticia');
                    var $ = cheerio.load(_new.html());

                    data.imageUrl = $('img[typeof="foaf:Image"]').attr("src");
                    data.subtitle = $('.field-name-field-bajada').text();
                    data.source = "Ministerio de cultura";
                    data.date = new Date( $('span[property="dc:date"]').attr('content') ); 
                    data.content = util.extractContent($('.field-name-body p'));

                    return data;
                })
                .catch(console.error);

        }).get() 

}

