var request = require("../lib/requestAsync");
var cheerio = require('cheerio');

function scrappData (config, $) {

    var selectors = config.selectors;

    return Promise.all(doWork());

    function doWork() {

        var data = {};
        var promises = [];

        $(selectors.posts).each((i, post) => {

            data.institution = $(selectors.institute).attr('content');
            data.url = $(post).find(selectors.link).attr('href');

            var promise = request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    data.title = $("h1.title-post").text();
                    data.subtitle = $("span.sub-title").text();
                    data.imageUrl = $("figure.main-image img").attr('src');

                    return data;
                });

            promises.push(promise);

        });

        return promises;

    }

}

module.exports = { scrappData };

