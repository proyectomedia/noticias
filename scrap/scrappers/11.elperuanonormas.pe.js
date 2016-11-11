var cheerio = require("cheerio");
var moment = require('moment');
var Promise = require('bluebird');

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {
    
    return [request.postAsync({
            url: `${config.url}/Filtro`,
            form: {
                cddesde: moment().format('DD/MM/YYYY'),
                cdhasta: moment().format('DD/MM/YYYY')
            }
        })
        .then(html => {

            $ = cheerio.load(html.body);

            var elements = $('article.edicionesoficiales_articulos')
                .slice(0, config.limit)
                .get();

            return Promise.map(elements, post => {

                var news = {};

                var title = $(post).find('h5 a');

                news.title =  $(post).find("h4").text() + ": " + title.text().trim();
                news.url = title.attr('href');
                news.date = util.getDate($(post).find('p b').first().text().trim(), 'DD/MM/YYYY');
                news.subtitle = $(post).find('p').last().text().trim();
                news.content = "";
                news.imageUrl = "https://s22.postimg.org/5cxpfbj69/Captura.png";
                news.files = [ $(".ediciones_botones ul li a").first().attr("href"), $(".ediciones_botones ul li a").last().attr("href") ];

                return news;

            })

        })];

}

