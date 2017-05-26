/*
    Review Date: 2016-11-07
    Reviewer: Kellerman Rivero.
    Improvements:
        2016-11-07: Resolve absolute url of attached files.
*/
var moment = require('moment-timezone');
var cheerio = require("cheerio");
var url = require('url');
var util = require('../../lib/util');

module.exports = function scrapper($, config) {

    return $("#listar")
        .find("table[width='100%'][border=0][cellspacing=3][cellpadding=0]")
        .slice(0, config.limit)
        .map((i, table) => {

            var childTable = $(table).find('table');
            var news = {};

            news.title = $(childTable).find(".texto_arial_plomo_n_11").text().trim();
            var fecha = $(childTable).find(".texto_arial_plomo_x3_10_negrita").text().trim();
            //Como su date es: 16 de Diciembre 2016 la funcion format() no lo reconoce por lo cual por default le quito las fechas
          //  console.log(fecha);
            if (fecha.indexOf("Enero")>=0) { fecha = fecha.replace("Enero", "01") };
            if (fecha.indexOf("Febrero")>=0) { fecha = fecha.replace("Febrero", "02") };
            if (fecha.indexOf("Marzo")>=0) { fecha = fecha.replace("Marzo", "03") };
            if (fecha.indexOf("Abril")>=0) { fecha = fecha.replace("Abril", "04") };
            if (fecha.indexOf("Mayo")>=0) { fecha = fecha.replace("Mayo", "05") };
            if (fecha.indexOf("Junio")>=0) { fecha = fecha.replace("Junio", "06") };
            if (fecha.indexOf("Julio")>=0) { fecha = fecha.replace("Julio", "07") };
            if (fecha.indexOf("Agosto")>=0) { fecha = fecha.replace("Agosto", "08") };
            if (fecha.indexOf("Septiembre")>=0) { fecha = fecha.replace("Septiembre", "09") };
            if (fecha.indexOf("Octubre")>=0) { fecha = fecha.replace("Octubre", "10") };
            if (fecha.indexOf("Noviembre")>=0) { fecha = fecha.replace("Noviembre", "11") };

            if (fecha.indexOf("Diciembre")>=0) { fecha = fecha.replace("Diciembre", "12") };

      //      console.log(fecha);
            var a=moment(fecha,'DD MM YYYY').format();
        //    console.log(a);
            news.date=a;
            news.content = $(childTable).find(".contenido1").text().trim();
            var urlimagen = $(table).find("img.TABLE_border4").attr('src');
            news.imageUrl= "http://www.sbn.gob.pe/" + urlimagen;
            news.files = [ util.resolveUrl(config.url, $(childTable).find("a.texto_arial_plomo_x2_11_negrita").attr('href')) ];
            var string = util.extractSummary(news.content,30);

            var parts=[];
            parts= string.split(".- ");
             news.subtitle =parts[1]+ " Descargar pdf del sitio oficial dando click en la imagen";
            news.url = util.resolveUrl(config.url, $(childTable).find("a.texto_arial_plomo_x2_11_negrita").attr('href'));

            return Promise.resolve(news);

        }).get();
}
