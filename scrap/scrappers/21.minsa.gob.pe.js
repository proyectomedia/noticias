var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('div.cont_not.txt_prensa_lista table')
        .slice(0, config.limit)
        .map((i, post) => {

            var news = {};
            var trs = $(post).find('tr');
            var imgDate = trs.first().find('td');
            var title = $(trs[1]).find('a');
            var postUrl = util.getAbsoluteUrl(config.url, title.attr('href'))

            news.imageUrl = imgDate.find('td img').first().attr('src');

            return request
                .getAsync(postUrl)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    news.title = $("div.conten div.txt1").text().trim();
                    news.subtitle = $("div.conten div.txt2").text().trim();                    
                    news.date = util.getDate($("div.fecha").text().trim(), 'dddd, D [de] MMMM [del] YYYY');
                    news.url = postUrl;
                    news.content = $('div.cont_not').text().trim();
                    news.files = [];

                    return news;
                })
                .catch(console.error); 

        }).get()

}

