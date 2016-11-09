var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config, html) {

    return $("div.views-row")
        .slice(0, config.limit)
        .map((i, post) => {

            var postUrl = util.resolveUrl(config.url, $(post).find('div.noticia_home_titulo h1 a').attr("href"));

            return request
                .getAsync(postUrl)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var news = {};

                    news.title = $("h1").text().trim();
                    news.subtitle = $('div.noticia_contenido p em').first().text().trim();
                    news.date = util.getDate($('span[property="dc:date"]').attr('content'));
                    news.imageUrl = $('div.noticia_imagen img').attr('src');
                    news.url = postUrl;
                    news.content = $('div.noticia_contenido').text().trim();
                    news.files = [];

                    return news;
                })
                .catch(console.error);

        }).get()

}

