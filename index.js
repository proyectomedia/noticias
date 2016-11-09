var schedule = require('node-schedule');

var _ = require('lodash');
var scrap = require('./scrap');
var dbConfig = require('./lib/db');
var bluebird = require('bluebird');

var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

console.log("Begin");
function* FetchAndSave() {

        var db = yield MongoClient.connect(dbConfig.mongoUri);
        console.log("Connected correctly to server");

        // Get the updates collection
        var collection = db.collection('news');

        var newsArray = yield scrap();
        var news = _.flatten(newsArray);

        for(var i = 0; i < news.length; i++)
        {
            var newsItem = news[i];
            var operation = yield collection.updateOne({ _id: newsItem._id }, newsItem, { upsert: true });

            if(operation.result.ok > 0) 
            {
                console.log("Document: " + newsItem._id + " successfully " + (operation.result.nModified > 0 ? "updated" : "added"));
            }
            else 
            {
                console.log("Document: " + newsItem._id + " cannot be saved in DB");
            }
        }

        db.close();
}

bluebird.coroutine(FetchAndSave)();


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