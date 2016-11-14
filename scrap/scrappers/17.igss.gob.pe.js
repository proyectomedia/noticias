var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $('table#example tbody tr')
        .slice(0, config.limit)
        .map((i, post) => {

            var news = {};

            var title = $(post).find('td a').last();
            news.title = title.text().trim();
            news.url = util.getAbsoluteUrl(config.url, title.attr('href'));

            return request
                .getAsync(news.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var content = $('article div.contenidoportal');

                    news.date = new Date(); //CHANGE THIS TO EXTRACT DATE IF POSIBLE
                    news.imageUrl = util.getAbsoluteUrl(config.url, content.find('img').first().attr('src'));
                    //arreglar el subtitulo no funciona
                    //news.subtitle = content.find('p span strong').first().text().trim();
                    var string=content.text();
                    //por el moment-timezon
                    var string2=util.fixedparrafo(string);
                    news.subtitle=util.extractSummary(string2);
                    news.content = string2;
                    news.files = [];

                    return news;
                })
                .catch(console.error);

        }).get()

}
