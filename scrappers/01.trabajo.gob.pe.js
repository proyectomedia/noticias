var cheerio = require("cheerio");

var request = require("../lib/requestAsync");
var util = require('../lib/util');

module.exports = function scrapper($, config) {

    return $("ul.posts-list li")
        .slice(0, config.limit)
        .map((i, post) => {

            var data = {}

            data.institution = "Ministerio del trabajo";
            data.source = "Ministerio de Trabajo";
            data.url = $(post).find("h2 a").attr("href");

            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    data.title = $("h1.title-post").text();
                    data.subtitle = $("span.sub-title").text();
                    data.date = util.getDate($("span.published").text().trim(), 'DD/MM/YYYY');
                    data.imageUrl = $("figure.main-image img").attr("src")
                    data.content = $("div.post-page p").map((i, p) => $(p).text()).get().join(" ").trim();

                    return data;
                })
                .catch(console.error);

        }).get()

}

