var URL = require('url');
var moment = require('moment-timezone');
var cheerio = require('cheerio');
const request = require('request');

moment.locale('es');

module.exports = {

    extractSummary: extractSummary,
    getAbsoluteUrl: getAbsoluteUrl,
    getDate: getDate,
    extractContent: extractContent,
    unshortUrl:unshortUrl
}

function extractSummary(text, words) {

    words = words || 20;

    return text.trim().split(" ").slice(words).join(" ") + "...";
}

function getAbsoluteUrl(someUrl, urlToConvert) {

    var args = Array.prototype.slice.call(arguments, 1);

    urlToConvert = args.map(e => e.replace(/^\/|\/$/g, "")).join("/");

    var url = URL.parse(someUrl);

    return `${url.protocol}//${url.host}/${urlToConvert}`;
}

function getDate(date, format) {

    //return moment.tz("America/Lima").parse(date, format).format();
    return moment(date, format).format();
}

function extractContent($selector) {

    var $ = cheerio.load($selector.html());

    return $selector
        .map((i, e) => $(e).text().trim())
        .get()
        .filter(t => t)
        .join("\n\n")
}

function injectJQuery() {

    var ss = document.createElement("script");
    ss.src = "http://code.jquery.com/jquery-3.1.1.min.js";
    ss.integrity = "sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
    ss.crossorigin ="anonymous";
    document.getElementsByTagName("head")[0].appendChild(ss);

}

function unshortUrl(shortUrl) {

    return new Promise((resolve, reject) => {

        if (isShort(shortUrl)) {

            request
                .post({
                    url: "http://urlex.org",
                    form: { s: shortUrl }
                }, (err, response) => {

                    if (err) throw new Error("Error");

                    var $ = cheerio.load(response.body);

                    var url = $('table td a').first().attr('href');

                    resolve(url);
                });

        } else {

            resolve(shortUrl);
        }

    });
}

function isShort(url) {

    return /\/\/(bit.ly|goo.gl)/g.test(url);
}
