var URL = require('url');
var moment = require('moment');

moment.locale('es');

module.exports = {

    extractSummary: extractSummary,
    getAbsoluteUrl: getAbsoluteUrl,
    getDate: getDate
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

    return moment(date, format).toDate();
}

function injectJQuery() {

    var ss = document.createElement("script");
    ss.src = "http://code.jquery.com/jquery-3.1.1.min.js";
    ss.integrity = "sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
    ss.crossorigin ="anonymous";
    document.getElementsByTagName("head")[0].appendChild(ss);

}