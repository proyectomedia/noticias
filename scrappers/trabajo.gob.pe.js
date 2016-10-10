var request = require("../lib/requestAsync");
var cheerio = require('cheerio');

function scrappData (config, $) {

    var selectors = config.selectors;

    return Promise.all(doWork());

    function doWork() {

        var promises = [];

        $(selectors.posts).each((i, post) => {

            var data = {};

            data.institution = $(selectors.institute).attr('content');
            data.url = $(post).find(selectors.link).attr('href');
            data.font = "Ministerio de Trabajo";

            var promise = request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    data.title = $("h1.title-post").text();
                    data.subtitle = $("span.sub-title").text();

                    var match = /\d{2}\/\d{2}\/\d{4}/g.exec($("span.published").text());

                    if (match) {
                        
                        data.date = new Date(match[0])
                    }

                    data.imageUrl = $("figure.main-image img").attr('src')
                    data.content = $("div.post-page p").map((i, p) => $(p).text()).get().join(" ").trim();

                    return data;
                });

            promises.push(promise);

        });

        return promises;

    }

}

module.exports = { scrappData };

