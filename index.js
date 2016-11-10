var schedule = require('node-schedule');

var _ = require('lodash');
var scrapping = require('./scrap');
var config = require('./config');
var bluebird = require('bluebird');
var fbApi = require('./lib/apiFace');

var pages = config.pages.filter(page => page.active && page.schedule);
pages.forEach(page => schedule.scheduleJob(page.schedule, () => scrapping.fetchAndSave(page.scrapper)));

schedule.scheduleJob({ minute: 7 }, () => {
    scrapping  
            .getRecentNews(1)
            .then(news => {
                 news.forEach(newsItem => {
                     fbApi.postNews("909439029189405", newsItem, (n) => scrapping.markAsPublished(n))
                 })
            });
});