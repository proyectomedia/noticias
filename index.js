var schedule = require('node-schedule');

var scrap = require('./scrap');
var dbConfig = require('./lib/db');
var _ = require('lodash');

var promisifyAll = require('bluebird').promisifyAll;
var spawn = require('q').spawn;

var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

spawn(function*() {

    try {

        var db = yield MongoClient.connect(dbConfig.mongoUri);
        console.log("Connected correctly to server");

        // Get the updates collection
        var collection = db.collection('news');

        scrap()
            .then(news => {
                news.forEach(newsItem => {
                    var result = yield collection.updateOne({ _id: newsItem._id }, newsItem, { upsert: true });
                    console.log(["Result:", result]);
                    console.log("Document: " + newsItem._id + " successfully added / updated");
                })
            })
            .catch(console.error);

        db.close();
    }
    catch (err) {

        console.error(err);
    }

});



//CADA 12 HORAS
// '0 0 */12 * * *'

/*scrap().then(news => {
    news;
});
*/

//schedule.scheduleJob('*/60 * * * * *', () => {

/*

    scrap()
        .then(news => {
            news.forEach(_new => {

                newsRef
                    .orderByKey()
                    .equalTo(_new._id)
                    .once('value')
                    .then(snap => snap.val())
                    .then(_newFromDB => {

                        if (!_newFromDB) {
                            return newsRef.child(_new._id).set(_new);
                        }

                    })
                    .catch(err => {

                        _new;
                    })

            })
        })
        .catch(err => {

            console.error(err);

        });

//});

schedule.scheduleJob('*\/0 * * * * *', () => {

    newsRef.once('child_added', snap => {
        console.log("Added " + snap.key);
    });
    
});
/*
newsRef.on('child_added', snap => {
    console.log("Added " + snap.key);
});

newsRef.on('child_changed', snap => {
    console.log("Changed " + snap.key);
});

newsRef.on('child_removed', snap => {
    console.log("Removed " + snap.key);
});
*/