var schedule = require('node-schedule');

var scrap = require('./scrap');
var f = require('./facebook/index');
var fb= require("./facebook/fbpages");
var firebaseApp = require('./lib/db');
var newsRef = firebaseApp.database().ref('news');
var FB = require('fb');
//CADA 12 HORAS
// '0 0 */12 * * *'
//.then(news => news.forEach(_new => newsRef.child(_new._id).set(_new)))

// schedule.scheduleJob('*/10 * * * * *', () => {
//
//     scrap()
//         .then(news => news.forEach(_new => {
//
//             newsRef.orderByKey().equalTo(_new._id).once('value', snap => {
//
//                 if (!snap.val()) {
//                     newsRef.child(_new._id).set(_new);
//                 }
//
//             })
//
//         }))
//         .catch(err => {
//
//             console.error(err);
//
//         });
//
// });






newsRef.on('child_added', snap => {
    console.log("Added " + snap.key);
});

newsRef.on('child_changed', snap => {
    console.log("Changed " + snap.key);
});

newsRef.on('child_removed', snap => {
    console.log("Removed " + snap.key);
});
