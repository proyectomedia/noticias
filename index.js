var schedule = require('node-schedule');

var _ = require('lodash');
var scrapping = require('./scrap');
var config = require('./config');
var bluebird = require('bluebird');
var fbApi = require('./lib/apiFace');
var f=require('./facebook/fbpages');
var scraperfacebook=require('./facebook/index');
var u=require('./lib/util');
var fs = require('fs');
//var uu = require('url-unshort');
var util = require('util');
var moment = require('moment-timezone');
const request = require('request');
var wstream = fs.createWriteStream(__dirname + '/monkeylearn.log', {flags : 'a'});
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;
var unshort = require('unshort');




//archivo texto
 console.log = function(d) {
  log_file.write(util.format(d) + '\n ');
  log_stdout.write(util.format(d) + '\n ');
};
console.log("comenzo a correr a las :"+ moment().format());
//facebook extaer noticias-> funcionan ok
 schedule.scheduleJob('0 */5 * * * *',()=>{
   console.log("");
   console.log("Entro a 5minutos");
   scraperfacebook.sacarpostyguardar(f.paginas5minutos)
   .catch(function (err) {
     console.log("Error:"+ err)
    })
 });

 schedule.scheduleJob('0 */15 * * * *',()=>{
   console.log("");
   console.log("Entro a 15minutos");
   scraperfacebook.sacarpostyguardar(f.paginas15minutos)
   .catch(function (err) {
     console.log("Error:"+ err)
    })
 });
 //dd

 schedule.scheduleJob('0 0 */1 * * *',()=>{
   console.log("");
   console.log("Entro a 60minutos");
   scraperfacebook.sacarpostyguardar(f.paginas60minutos)
   .catch(function (err) {
     console.log("Error:"+ err)
    })
   
 });
 //
 //Scraper web
 var pages = config.pages.filter(page => page.active && page.schedule);
 pages.forEach(page => {
     page.schedule.forEach(pageSchedule => schedule.scheduleJob(pageSchedule, () => scrapping.fetchAndSave(page.url)))
 });


// Publicar noticias
 f.page.forEach(page => {
  if (page.active=="true"){
  schedule.scheduleJob(page.schedule, () => {
      scrapping
              .getRecentNews(1, page.tipo, page.nrepublish)
              .then(news => {
                  news.forEach(newsItem => {
                       fbApi.postNews(page.id,page.token, newsItem, (n) => scrapping.markAsPublished(n, page.tipo))
                   })
              });
  });
};
});

//Monkeylearn

  schedule.scheduleJob('0 0 */1 * * *', () => {
      scrapping.updatecategories(10)
  });







//}

//Pruebas aca abajo

// unshort('https://goo.gl/vdXaYQ', function (err, url) {
//   console.log(url); // http://github.com/julianduque
// });


//scraperfacebook.sacarpostyguardar(f.paginas5minutos)
//scrapping.updatecategories(4);



// uu.expand('http://goo.gl/HwUfwd', (err, url) => {
//   // connection error or similar
//   if (err) throw err;
//
//   if (url) console.log('Original url is: ${url}');
//   // no shortening service or an unknown one is used
//   else console.log('This url can\'t be expanded');
// });

// uu.Unshort('http://goo.gl/HwUfwd').then(url => {
//   if (url) console.log('Original url is: ${url}');
//   // no shortening service or an unknown one is used
//   else console.log('This url can\'t be expanded');
// });

// u.unshortUrl('https://goo.gl/vdXaYQ')
//  .then(categoria=>
//  console.log(categoria)
//  );

// var text="Hay cuatro candidatos para presidir el Poder Judicial durante 2017 y 2018 Elección en la Corte Suprema, las Cortes Superiores de Justicia y las oficinas que investigan la conducta de los servidores judiciales.Es tiempo de renovación de autoridades en el Poder Judicial. El jueves 1º de diciembre los 19 jueces supremos titulares del país elegirán un nuevo presidente de la Corte Suprema de Justicia y del Poder Judicial.";
//
// u.findcategory(text)
// .then(categoria=>
//   console.log(categoria)
// );

// var url ="https://api.monkeylearn.com/v2/classifiers/cl_WDSy2GFG/classify/?";
//
//
// var text="Hay cuatro candidatos para presidir el Poder Judicial durante 2017 y 2018 Elección en la Corte Suprema, las Cortes Superiores de Justicia y las oficinas que investigan la conducta de los servidores judiciales.Es tiempo de renovación de autoridades en el Poder Judicial. El jueves 1º de diciembre los 19 jueces supremos titulares del país elegirán un nuevo presidente de la Corte Suprema de Justicia y del Poder Judicial.";
// var data = {"text_list": [text]};
//
// request.post(
// {url:url,
// json: true,
// formData: data,
// headers: {
//      "Authorization":"Token 67c6ab3fd318c390b2940992446ff8260e2d037c" ,
//      "Content-Type": "application/json"
//   }
// },function(err, httpResponse, body) {
//   if (err) {
//     return console.error('post failed:', err);
//   }
//
//   console.log('Post successful!  Server responded with:', body);
//   var probabilidad=0.000;
//   var categoria="";
//   var tem=body.result[0];
//    console.log(JSON.stringify(tem, {indent: true}));
//  for(n in tem){
//    //console.log( typeof tem[n].probability != "number");
//    console.log(n);
//      if (probabilidad<tem[n].probability){
//      probabilidad=tem[n].probability;
//      categoria=tem[n].label;
//   }
//
// console.log(categoria);
// });



// var a = new Date();
// var b=moment().format();
// var bb=moment().tz('America/Los_Angeles').format();
// var C=moment().add(7, 'days').format();
// var D=moment('2016-11-18T20:58:48+0000').add(-1, 'days').format();
 // var b=new Date('16 de Diciembre 2016');
 // console.log(b);
 // var a=moment('16 de Diciembre 2016','dd-mm-yyyy').format();
 // console.log(a);
// console.log(b);
// console.log(bb);
// console.log(D);
//
// if (D<=b){console.log("entro")}
// else{console.log("else")}

// var aa= u.getDate('2016-03-12 13:40:00');
// console.log(aa);
// console.log(b);
// console.log(C);
// console.log(D);
// var request = "curl --data"+
//   '{"text_list": ["some"]}'  \
// -H "Authorization:Token 67c6ab3fd318c390b2940992446ff8260e2d037c" \
// -H "Content-Type: application/json" \
// -D - \
// "https://api.monkeylearn.com/v2/classifiers/cl_WDSy2GFG/classify/?";
//
//
// scrapping.getRecentNews(50, "politica")
// .then(function(news){
//   console.log(news.toString());
//   for (i in news){
//     console.log(news[i].source);
//       console.log(news[i].title);
//       console.log(news[i].priority);
//      console.log(news[i].date);
//      console.log(news[i].published["politica"]);
//       console.log("");
//     }
// });

//probando unshort
// for(i=0; i<100; i++){
//   try{
//
//   u.unshortUrl('https://goo.gl/ZjNpLZ')
//   .then(link=>
//    console.log(link)
//  );
// }catch(err){
//    console.log(err);
// }
// };

// scrapping.getRecentNews(1, 'empresas')
// .then(news => {
//                   news.forEach(n => {
//                     console.log(n.title)
//                     //   scrapping.markAsPublished(n,'empresas');
//                    })
//               });

//scrapping.fetchAndSave("http://www.inpe.gob.pe/contenidosprensa_all.php?direccion=1");
//scrapping.fetchAndSave("http://www.minjus.gob.pe/categoria/ultimas-noticias/"");
// scrapping.fetchAndSave("http://www.minsa.gob.pe/index.asp?op=5#Prensa");
 // scrapping.fetchAndSave("http://www.sbn.gob.pe/noticias_hist.php");

//scrapping.markAsPublished(1, page.tipo)


         //.then(news => news.forEach(n => scrapping.markAsPublished(n, 'politica')));


// scrapping.getRecentNews(10, "politica")
//                   .then(news => {
//                      console.log(news);
//                    });
