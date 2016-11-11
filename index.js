var schedule = require('node-schedule');

var _ = require('lodash');
var scrapping = require('./scrap');
var config = require('./config');
var bluebird = require('bluebird');
var fbApi = require('./lib/apiFace');
var f=require('./facebook/fbpages');
var scraperfacebook=require('./facebook/index');

// var pages = config.pages.filter(page => page.active && page.schedule);
// console.log(pages);
// pages.forEach(page => schedule.scheduleJob(page.schedule, () =>
// {console.log("entro");scrapping.fetchAndSave(page.scrapper)}));

// schedule.scheduleJob({ minute: 1 }, () => {
//
// //  For()
//   console.log("10 segundos lee opcion 1");
//     scrapping
//             .getRecentNews(1)
//             .then(news => {
//                  news.forEach(newsItem => {
//                      fbApi.postNews("909439029189405", newsItem, (n) => scrapping.markAsPublished(n))
//                  })
//             });
// });
//
// schedule.scheduleJob('0 */1 * * * *', () => {
//   console.log("cada minuto lee opcion 2");
// //  For()
//     scrapping
//             .getRecentNews(1)
//             .then(news => {
//               if(!news==""){
//                 console.log("entro" +news);
//                  news.forEach(newsItem => {
//                      fbApi.postNews("909439029189405", newsItem, (n) => scrapping.markAsPublished(n))
//                  })
//                }else{
//                  console.log("no saco noticias recientes");
//                }
//             });
// });

//facebook scrapers
// schedule.scheduleJob('0 */5 * * * *',()=>{
   var a=scraperfacebook.sacarpostyguardar(f.paginas5minutos);
    // a.next();

  // scraperfacebook.sacarpostyguardar.next();
// });
// schedule.scheduleJob('0 */15 * * * *',()=>{
//   scraperfacebook.sacarpostyguardar(f.paginas5minutos);
//
// });
//
// schedule.scheduleJob('0 0 */1 * * *',()=>{
//   scraperfacebook.sacarpostyguardar(f.paginas5minutos);
//
// });
