var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("div.box_post li.clearfix")
        .slice(0, config.limit)
        .map((i, post) => {

            var postUrl = $(post).find('div.span_14 h3 a').attr("href");

            return request
                .getAsync(postUrl)
                .then(html => {

                    var _new = cheerio.load(html.body)('div.box_post');
                    var $ = cheerio.load(_new.html());

                    var news = {};
                    var date = $('#fecha');

                    news.title = $("h1").text().trim();
                    news.date = util.getDate(date.text().trim(), 'YYYY-MM-DD');
                    news.imageUrl = date.next().next().find('img').attr('src');
                    news.content = date
                        .nextAll('p[style]')
                        .map((i, p) => $(p).text().trim())
                        .get()
                        .filter(t => t)
                        .join("\n\n");

                    var string = util.extractSummary(news.content, 30);

                    var parts=[];
                    parts= string.split(".");
                   news.subtitle =parts[1]+"...";
                    news.url = postUrl;
                    news.files = [];

                    return news;
                })
                .catch(console.error);

        }).get()



}
