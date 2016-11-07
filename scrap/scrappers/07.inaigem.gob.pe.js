var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("article.sermon")
        .slice(0, config.limit)
        .map((i, post) => {

            var postUrl = $(post).find("header.post-title").find("a").attr("href");

            return request
                .getAsync(postUrl)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var news = {};

                    news.title = $(".post-title").text().trim();
                    news.date = util.getDate($(".post-content").find('span.meta-data').text(), 'YYYY-MM-DD h:m:s');
                    news.imageUrl = $('div.featured-image').find('img').attr('src');
                    news.url = postUrl;

                    var content = "";

                    $('p')
                        .not('.r-texto')
                        .each(function() {
                            content += $(this).text() + '\n';
                        });
                    
                    news.content = content;
                    news.subtitle = util.extractSummary(content);
                    news.files = [];
                    //news.categoryNew = $('span.meta-data span').last().find('a').text().trim();
                    

                    return news;
                })
                .catch(console.error);

        }).get()

        

}

