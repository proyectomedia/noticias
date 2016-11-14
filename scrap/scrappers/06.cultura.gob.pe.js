var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("li#categoria-1 div.node-noticia")
        .slice(0, config.limit)
        .map((i, post) => {

            var postUrl = util.resolveUrl(config.url,  $(post).find("div[property='dc:title']").find('a').attr("href"));

            return request
                .getAsync(postUrl)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var news = {};

                    news.title = $("div[property='dc:title']").text().trim();
                    var string = $('.field-name-field-bajada').text();
                    var string2= string.replace("\u2022\t", "");
                     var string3= string2.replace(".", "...");
                    news.subtitle=string3;

                    news.date = new Date( $('span[property="dc:date"]').attr('content') );
                    news.imageUrl = $('img[typeof="foaf:Image"]').attr("src");
                    news.content = util.extractContent($('.field-name-body p'));
                    news.files = [];
                    news.url = postUrl;

                    return news;
                })
                .catch(console.error);

        }).get()

}
