var URL = require('url');
var moment = require('moment-timezone');
var cheerio = require('cheerio');
const request = require('request');

moment.locale('es');

module.exports = {
    fixedparrafo:fixedparrafo,
    findAndReplace: findAndReplace,
    extractSummary: extractSummary,
    getAbsoluteUrl: getAbsoluteUrl,
    getDate: getDate,
    extractContent: extractContent,
    unshortUrl:unshortUrl,
    resolveUrl:resolveUrl,
    extractYoutubeVideoIdFromUrl: extractYoutubeVideoIdFromUrl,
    getDefaultYoutubeVideoThumbnail: getDefaultYoutubeVideoThumbnail
}

function fixedparrafo(string) {
  var cadena=string;
   if(cadena && (cadena.length>0)){

  var string1= findAndReplace(cadena,"\u200b", "");
  var string2 =  findAndReplace(string1,"\u201c"," '");
  var string3 =  findAndReplace(string2,"\u201d","' ");
  var string4 =  findAndReplace(string3,"\n"," ");
  var string5 =  findAndReplace(string4,"\t"," ");
  var string6 =  findAndReplace(string5,"\r","' ");
  var string7 =  findAndReplace(string5,"\u2013","' ");


   cadena = string7;
}
  return cadena;

}

function findAndReplace(string, target, replacement) {

 if(string.length>0){
 var i = 0, length = string.length;

 for (i; i < length; i++) {

   string = string.replace(target, replacement);

 }
}
 return string;


}



function extractSummary(text, words) {

    words = words || 20;

    return text.trim().split(" ").slice(0, words).join(" ") + "...";
}

function resolveUrl(from, to) {

    if(to)
    {
        return URL.resolve(from, to);
    }

    return "";
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

    return /\/\/(bit.ly|goo.gl|ow.ly)/g.test(url);
}

function extractYoutubeVideoIdFromUrl(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function getDefaultYoutubeVideoThumbnail(videoId)
{
    return "https://img.youtube.com/vi/" + videoId + "/0.jpg";
}
