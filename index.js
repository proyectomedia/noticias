var schedule = require('node-schedule');

var _ = require('lodash');
var scrapping = require('./scrap');
var config = require('./config');
var bluebird = require('bluebird');
var fbApi = require('./lib/apiFace');
var f=require('./facebook/fbpages');
var scraperfacebook=require('./facebook/index');




//facebook scrapers-funcionan
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


//Scraper web
 // var pages = config.pages.filter(page => page.active && page.schedule);
 // pages.forEach(page => {
 //     page.schedule.forEach(pageSchedule => schedule.scheduleJob(pageSchedule, () => scrapping.fetchAndSave(page.scrapper)))
 // });


// scrapping.fetchAndSave("https://www.ositran.gob.pe/publicaciones1/notas-de-prensa.html");


//Publicar noticias

schedule.scheduleJob({ minute: 7 }, () => {
    scrapping
            .getRecentNews(1)
            .then(news => {
                 news.forEach(newsItem => {
                     fbApi.postNews("909439029189405", newsItem, (n) => scrapping.markAsPublished(n))
                 })
            });
});
