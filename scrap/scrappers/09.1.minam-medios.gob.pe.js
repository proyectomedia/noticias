var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("div.box_post li.clearfix")
        .slice(0, config.limit)
        .map((i, post) => {

            var postUrl = $(post).find('div.span_14 h3 a').attr("href");
            var imageUrl = $(post).find('div.box_img a img').attr('src');

            return request
                .getAsync(postUrl)
                .then(html => {

                    var _new = cheerio.load(html.body)('div.box_post');
                    var $ = cheerio.load(_new.html());
                    
                    var news = {};
                    var fecha = $('#fecha');

                    news.title = $("h1").text().trim();
                    news.date = util.getDate(fecha.text().trim(), 'YYYY-MM-DD');
                    news.videoUrl = $("iframe[src*='youtube']").attr("src");
                    news.imageUrl = imageUrl || util.getDefaultYoutubeVideoThumbnail(util.extractYoutubeVideoIdFromUrl(news.videoUrl));
                    news.content = fecha
                        .nextAll('p[style]')
                        .map((i, p) => $(p).text().trim())
                        .get()
                        .filter(t => t)
                        .join("\n\n");

                    news.subtitle = util.extractSummary(news.content, 50);
                    news.url = postUrl;
                    news.files = [];

                    return news;
                })
                .catch(console.error);

        }).get()
}

