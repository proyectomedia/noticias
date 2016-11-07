/*
    Review Date: 2016-11-07
    Reviewer: Kellerman Rivero.
*/

var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    //Map every post to a new request to get info.
    return $("ul.posts-list li")
        .slice(0, config.limit)
        .map((i, post) => {

            var postUrl = $(post).find("h2 a").attr("href");

            return request
                .getAsync(postUrl)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var news = {};

                    news.date = util.getDate($("span.published").text().trim(), 'DD/MM/YYYY');   
                    news.title = $("h1.title-post").text();
                    news.subtitle = $("span.sub-title").text();       
                    news.imageUrl = $("figure.main-image img").attr("src");    
                    news.url = postUrl;
                    news.content = $("div.post-page p").map((i, p) => $(p).text()).get().join(" ").trim();                    
                    news.files = [];
                    
                    return news;
                })
                .catch(console.error);
        }).get()
}

