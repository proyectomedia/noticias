/*
    Review Date: 2016-11-07
    Reviewer: Kellerman Rivero.
*/
var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("div.Lista_Noticia")
        .slice(0, config.limit)
        .map((i, post) => {

            var postUrl = $(post).find("div.Lst_Not_Title a").attr("href");

            return request
                .getAsync(postUrl)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var news = {};
                    news.title = $(".header-title").text().trim();
                    var string = $('div.Noticia_IntIntro').text().trim();

                   var string2= string.replace("\"", "");
                   
                    var string3= string2.replace("\"", "");

                   news.subtitle=string3+"...";

                    news.date = util.getDate($('div.Noticia_IntDate').text().trim(), 'YYYY/MM/DD');
                    news.imageUrl = util.getAbsoluteUrl(config.url, $('div.Noticia_Int_ContImag').find('img').attr('src'));
                    news.content = $("div.Noticia_IntContenido").html();
                    news.files = [];
                    news.url = postUrl;

                    return news;
                })
                .catch(console.error);

        }).get()

}
