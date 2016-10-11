var cheerio = require("cheerio");
var request = require("../lib/requestAsync");
var generateId = require('../lib/generateId');

module.exports = function scrapper($, config) {

    return $("ul.posts-list li")
        .slice(0, config.limit)
        .map((i, post) => {

            var data = { config }

            data.institution = "Ministerio del trabajo";
            data.source = "Ministerio de Trabajo";
            data.url = $(post).find("h2 a").attr("href");

            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    data.title = $("h1.title-post").text();
                    data.subtitle = $("span.sub-title").text();

                    var match = /\d{2}\/\d{2}\/\d{4}/g.exec($("span.published").text());

                    if (match) {
                        
                        data.date = new Date(match[0]);
                    }

                    data.imageUrl = $("figure.main-image img").attr("src")
                    data.content = $("div.post-page p").map((i, p) => $(p).text()).get().join(" ").trim();

                    data = generateId(data);
                    data.config = config;

                    return data;
                })
                .catch(console.error);

        }).get()

}

