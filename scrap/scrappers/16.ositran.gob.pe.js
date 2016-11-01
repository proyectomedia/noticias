var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('div[itemprop="articleBody"]')
        .find(".title-noticias-pola")
        .map((i, titlEeE) => {
            return {
                title: $(titlEeE),
                date: $('table.date-noticias-pola').eq(i),
                img: $('div.img-noticias-pola').eq(i),
                content: $('div.content-noticias-pola').eq(i)
            }
        })
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {};

            data.institution = "OSITRAN";

            data.category = config.category;
            data.priority = config.priority;
            data.title = post.title.text().trim();
            data.date = util.getDate(post.date.text().replace(/[\r\n]/g, " ").trim(), "DD MM YY");
            data.imageUrl = util.getAbsoluteUrl(config.url, post.img.find('img').attr('src'));
            data.source = data.institution;
            data.url = post.img.find('a').attr('href');
            try {
                var content = post.content.text().trim()
                var middle = content.indexOf(".-");
                data.subtitle = util.extractSummary(content.slice(middle + 2)).trim();
            } catch(e) {}

            return data;          

        }).get()

}

