var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("div.post-holder.radius-full")
        .slice(0, config.limit)
        .map((i, post) => {

            var news = {};
            var postUrl = $(post).find('h2.title a').attr('href');

            news.date = util.getDate($(post).find('div.excerpt.radius-bottom small').first().text().trim(), 'MMMM D, YYYY');

            return request
                .getAsync(postUrl)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    news.title = $("h1.headline").text().trim();
                    //news.date = util.getDate($(".icon-time").parent().text().trim());
                    news.imageUrl = $('div.feature-img img').attr('src');
                    news.url = postUrl;
                    news.content = $('div.postarea')
                        .find('p')
                        .map((i, p) => $(p).text().trim())
                        .get()
                        .filter(t => t)
                        .join("\n\n");

                  string  = util.extractSummary(news.content,30);
                    var parts=[];
                     parts= string.split("\n\n");
                     console.log(parts);

                   news.subtitle =parts[1]+"...";
                    news.files = [];

                    return news;
                })
                .catch(console.error);

        }).get()

}
