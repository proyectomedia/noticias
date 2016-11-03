var cheerio = require("cheerio");

var request = require("../../lib/requestAsync");
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("table.WPU-Tablem2 h3 a")
        .slice(0, config.limit)
        .map((i, link) => {

            var data = {};

            data.institution = "RREE";

            data.category = config.category;
            data.priority = config.priority;
            data.url = util.getAbsoluteUrl(config.url, $(link).attr('href'));

            return request
                .getAsync(data.url)
                .then(html => {

                    var $ = cheerio.load(html.body);

                    data.imageUrl = util.getAbsoluteUrl(config.url, $('div#ctl00_PlaceHolderMain_ctl00__ControlWrapper_RichImageField img').attr('src'));
                    data.source = data.institution;
                    data.title = $('div#ctl00_PlaceHolderMain_RichHtmlField1__ControlWrapper_RichHtmlField').text().trim();
                    var date = $('div#ctl00_PlaceHolderMain_ctl02__ControlWrapper_RichHtmlField').text().trim();
                    try {
                        data.date = util.getDate(date.split("-")[1].trim(), 'DD/MM/YYYY');
                    } catch (e) {}
                    data.subtitle = util.extractSummary($('div#ctl00_PlaceHolderMain_RichHtmlField2__ControlWrapper_RichHtmlField p').slice(1, -1).text().trim());

                    return data;
                })
                .catch(console.error);            

        }).get()

}

