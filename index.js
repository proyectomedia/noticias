var schedule = require('node-schedule');

var _ = require('lodash');
var scrapping = require('./scrap');
var config = require('./config');
var bluebird = require('bluebird');
var fbApi = require('./lib/apiFace');
var f=require('./facebook/fbpages');
var scraperfacebook=require('./facebook/index');

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

 schedule.scheduleJob('0 0 */1 * * *',()=>{
   console.log("");
   console.log("Entro a 60minutos");
   scraperfacebook.sacarpostyguardar(f.paginas60minutos)
   .catch(function (err) {
     console.log("Error:"+ err)
    })
 });
//
//
// //Scraper web
 var pages = config.pages.filter(page => page.active && page.schedule);
 pages.forEach(page => {
     page.schedule.forEach(pageSchedule => schedule.scheduleJob(pageSchedule, () => scrapping.fetchAndSave(page.url)))
 });
//
//
//
//
//Publicar noticias
 f.page.forEach(page => {
  schedule.scheduleJob(page.schedule, () => {
      scrapping
              .getRecentNews(1, page.tipo)
              .then(news => {
                  news.forEach(newsItem => {
                       fbApi.postNews(page.id, newsItem, (n) => scrapping.markAsPublished(n, page.tipo))
                   })
              });
  });
})

//Pruebas aca abajo
// scrapping.getRecentNews(1, 'seguridad')
// .then(news => {
//                   news.forEach(n => {
//                     console.log(n);
//                        scrapping.markAsPublished(n,'empresas');
//                    })
//               });

//scrapping.fetchAndSave("http://www.inpe.gob.pe/contenidosprensa_all.php?direccion=1");
//scrapping.fetchAndSave("http://www.minjus.gob.pe/categoria/ultimas-noticias/"");

//scrapping.fetchAndSave("https://www.inei.gob.pe/prensa/noticias/");
//scrapping.fetchAndSave("http://www2.trabajo.gob.pe/prensa/notas-de-prensa/");

//scrapping.markAsPublished(1, page.tipo)


         //.then(news => news.forEach(n => scrapping.markAsPublished(n, 'politica')));


// scrapping.getRecentNews(10, "politica")
//                   .then(news => {
//                      console.log(news);
//                    });
