var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("table.WPU-Tablem2 h3 a")
        .slice(0, config.limit)
        .map((i, link) => {

            var postUrl = util.getAbsoluteUrl(config.url, $(link).attr('href'));

            return request
                .getAsync(postUrl)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    var news = {};

                    string = $('div#ctl00_PlaceHolderMain_RichHtmlField1__ControlWrapper_RichHtmlField').text().trim();
                    var string2= string.replace("\u200b", "");
                    news.title=string2;
                    news.subtitle = util.extractSummary($('div#ctl00_PlaceHolderMain_RichHtmlField2__ControlWrapper_RichHtmlField p').slice(1, -1).text().trim());
                    news.imageUrl = util.getAbsoluteUrl(config.url, $('div#ctl00_PlaceHolderMain_ctl00__ControlWrapper_RichImageField img').attr('src'));
                    news.url = postUrl;

                    var date = $('div#ctl00_PlaceHolderMain_ctl02__ControlWrapper_RichHtmlField').text().trim();
                    try {
                        news.date = util.getDate(date.split("-")[1].trim(), 'DD/MM/YYYY');
                    }
                    catch (e)
                    {
                        news.date = new Date();
                    }

                    news.content = $("#ctl00_PlaceHolderMain_RichHtmlField2__ControlWrapper_RichHtmlField div div p")
                        .map((i, p) => {

                            if($(p).text().trim().length > 0)
                            {
                                return $(p).text().trim()
                            }
                            return "";
                        })
                        .get()
                        .filter(t => t)
                        .join("\n\n");

                    news.files = [];

                    return news;
                })
                .catch(console.error);

        }).get()

}
