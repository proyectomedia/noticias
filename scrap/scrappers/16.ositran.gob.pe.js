var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('div[itemprop="articleBody"]')
        .find(".title-noticias-pola")
        .map((i, title) => {
            return {
                title: $(title),
                date: $('table.date-noticias-pola').eq(i),
                img: $('div.img-noticias-pola').eq(i),
                content: $('div.content-noticias-pola').eq(i)
            }
        })
        .slice(0, config.limit)
        .map((i, post) => {

            var news = {};

            news.title = post.title.text().trim();
            news.date = util.getDate(post.date.text().replace(/[\r\n]/g, " ").trim(), "DD MM YY");
            news.imageUrl = util.getAbsoluteUrl(config.url, post.img.find('img').attr('src'));
            news.url = post.img.find('a').attr('href');

            try {
                var content = post.content.text().trim()
                var middle = content.indexOf(".-");
                news.content = content;
                news.subtitle = util.extractSummary(content.slice(middle + 2)).trim();
            } 
            catch(e) {
                news.content = "";
                news.subtitle = "";
            }

            news.files = [ post.img.find('a').attr('href') ];

            return news;          

        }).get()
}

