var URL = require('url');
var moment = require('moment-timezone');
var cheerio = require('cheerio');
const request = require('request');
var requestretry = require('requestretry');
var fs = require('fs');
var wstream = fs.createWriteStream(__dirname + '/../monkeylearn.log', {flags : 'a'});
var unshort = require('unshort');
moment.locale('es');

module.exports = {
    findcategory:findcategory,
    fixedparrafo:fixedparrafo,
    findAndReplace: findAndReplace,
    extractSummary: extractSummary,
    getAbsoluteUrl: getAbsoluteUrl,
    getDate: getDate,
    extractContent: extractContent,
    unshortUrl2:unshortUrl2,
    unshortUrl:unshortUrl,
    resolveUrl:resolveUrl,
    extractYoutubeVideoIdFromUrl: extractYoutubeVideoIdFromUrl,
    getDefaultYoutubeVideoThumbnail: getDefaultYoutubeVideoThumbnail
}




function findcategory(text) {



    return new Promise((resolve, reject) => {
      //3 segundos de retardo por cada peticion pide monkeylearn
    setTimeout(function(){


      var data = {"text_list": [text]};
      var url ="https://api.monkeylearn.com/v2/classifiers/cl_WDSy2GFG/classify/?";
           requestretry
           .post({
           url:url,
           json: true,
           formData: data,
           maxAttempts: 7,
           retryDelay: 4000,
           retrySrategy: requestretry.RetryStrategies.HTTPOrNetworkError,
           headers: {
                "Authorization":"Token 67c6ab3fd318c390b2940992446ff8260e2d037c" ,
                "Content-Type": "application/json"
             }
           }, function(err, response, body){
             if (err) { console.error('Error en funcion findcategory/utiljs failed:', err);}
             if (response) {
              var probabilidad=0.000;
              var categoria="";

               var tem=body.result[0];
               //console.log(JSON.stringify(tem, {indent: true}));
               for(n in tem){
                 //console.log( typeof tem[n].probability != "number");
                 if (probabilidad<tem[n].probability){
                 probabilidad=tem[n].probability;
                 categoria=tem[n].label;
               }}
               wstream.write("monkeylearn categoria:"+categoria+ "-probabilidad:"+probabilidad+"\n\n");
                 console.log('The number of request attempts: ' + response.attempts);
              //  console.log("monkeylearn categoria:"+categoria);
              //  console.log("monkeylearn probabilidad:"+probabilidad);
              if (probabilidad>0.000){resolve(categoria)}
              else {resolve("")};
             }
          });





    }, 3000);
  });
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

  //  return moment.tz("America/Lima").parse(date, format).format();
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

function unshortUrl2(shortUrl) {
  var urlexorg="true";
  var unshortenme="true";

    return new Promise((resolve, reject) => {

        if (isShort(shortUrl)) {

          unshort(shortUrl, function (err, url) {
            //console.log(url); // http://github.com/julianduque
           if (err){console.log("ERROR unshort2 url:"+shortUrl);}
              resolve(url);
          });
        } else {

            resolve(shortUrl);
        }

        });
    }
function unshortUrl(shortUrl) {
  var urlexorg="true";
  var unshortenme="true";

    return new Promise((resolve, reject) => {

        if (isShort(shortUrl)) {
        //mejorado pero con error de etimedout: tiempo se acabo
            // request
            //     .post({
            //         url: "http://urlex.org",
            //         form: { s: shortUrl }
            //     }, (err, response,body) => {
            //
            //         //if (err) throw new Error("Error");
            //         if (err) { console.error(' failed:', err);}
            //       if (response) {
            //         var $ = cheerio.load(body);
            //
            //         var url = $('table td a').first().attr('href');
            //
            //         resolve(url);
            //       }
            //     });

             //version de request retry se arreglo :)

          if (urlexorg==="true"){
              requestretry
                .post({
                url: "http://urlex.org",
                form: { s: shortUrl },
                json: true,
                maxAttempts: 1,  // (default) try 5 times
                retryDelay: 3000, // (default) wait for 5s before trying again
               retrySrategy: requestretry.RetryStrategies.HTTPOrNetworkError // (default) retry on 5xx or network errors
               }, function(err, response, body){
               if (err) { console.error(' fallo en funcion /urlexorg/unshortUrl/util failed:', err);}
               if (response) {

                 var $ = cheerio.load(body);

                 var url = $('table td a').first().attr('href');
                console.log("funcion unshort urlex entro con: "+shortUrl+" y devolvio:"+url);
                console.log('The number of request attempts: ' + response.attempts);
                  if ((url=== undefined) && (unshortenme==="true")){
                    requestretry
                      .post({
                      url: "http://www.linkexpander.com/",
                      form: { url: shortUrl },
                      json: true,
                      maxAttempts: 3,  // (default) try 5 times
                      retryDelay: 3000, // (default) wait for 5s before trying again
                     retrySrategy: requestretry.RetryStrategies.HTTPOrNetworkError // (default) retry on 5xx or network errors
                     }, function(err, response, body){
                     if (err) { console.error(' fallo en funcion unshorme/unshortUrl/util failed:', err);}
                     if (response) {
                      console.log(body);
                       var $ = cheerio.load(body);
                      // console.log($('title').text());
                       var url2s = $('.inline-form');
                      //  url2 = url2s.html();
                       console.log(url2s.html());
                      console.log("funcion unshort unshorme entro con: "+shortUrl+" y devolvio:");
                      console.log('The number of request attempts: ' + response.attempts);

                      // resolve(url2);
                    }
                    });

                  }
                 resolve(url);
                }
               });

          }
        } else {

            resolve(shortUrl);
        }

    });
}

function isShort(url) {

    return /\/\/(bit.ly|goo.gl)/g.test(url);
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
