var schedule = require('node-schedule');

var scrap = require('./scrap');
var firebaseApp = require('./lib/db');
var newsRef = firebaseApp.database().ref('news');

//CADA 12 HORAS
// '0 0 */12 * * *'

schedule.scheduleJob('*/10 * * * * *', () => {

    scrap()
        .then(news => news.forEach(_new => newsRef.child(_new._id).set(_new)))
        .catch(err => {

            console.error(err);

        });

});