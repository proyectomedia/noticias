var scrap = require('./scrap');

var firebaseApp = require('./lib/db');
var newsRef = firebaseApp.database().ref('news');

scrap().then(news => {

    news.forEach(_new => {

        newsRef.child(_new.id).set(_new);

    });

    process.exit();

}).catch(err => {

    console.error(err);
    process.exit(1);

});

