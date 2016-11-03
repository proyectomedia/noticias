var schedule = require('node-schedule');

var scrap = require('./scrap');
var firebaseApp = require('./lib/db');
var newsRef = firebaseApp.database().ref('news');
var _ = require('lodash');

//CADA 12 HORAS
// '0 0 */12 * * *'

/*scrap().then(news => {
    news;
});
*/

//schedule.scheduleJob('*/60 * * * * *', () => {

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

schedule.scheduleJob('*/0 * * * * *', () => {

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