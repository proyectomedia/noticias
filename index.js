var schedule = require('node-schedule');

var _ = require('lodash');
var scrapping = require('./scrap');
var config = require('./config');
var bluebird = require('bluebird');
var fbApi = require('./lib/apiFace');

scrapping.fetchAndSave("https://www.ositran.gob.pe/publicaciones1/notas-de-prensa.html");

/*
var pages = config.pages.filter(page => page.active && page.schedule);
pages.forEach(page => {
    page.schedule.forEach(pageSchedule => schedule.scheduleJob(pageSchedule, () => scrapping.fetchAndSave(page.scrapper)))
});

schedule.scheduleJob({ minute: 7 }, () => {
    scrapping  
            .getRecentNews(1)
            .then(news => {
                 news.forEach(newsItem => {
                     fbApi.postNews("909439029189405", newsItem, (n) => scrapping.markAsPublished(n))
                 })
            });
});*/