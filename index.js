var schedule = require('node-schedule');

var scrap = require('./scrap');
var f = require('./facebook/index');
var fb= require("./facebook/fbpages");
var firebaseApp = require('./lib/db');
var newsRef = firebaseApp.database().ref('news');

var FB = require('fb');

var _ = require('lodash');


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
        });

schedule.scheduleJob('*/0 * * * * *', () => {

    newsRef.once('child_added', snap => {
        console.log("Added " + snap.key);
    });

});

f.sacarpostyguardar(fb.paginas5minutos);
//sacarpostyguardar(paginas15minutos);
//sacarpostyguardar(paginas60minutos);

/*
>>>>>>> ea28c64d7a7844a771ff357704ba05f5a2c992a5
newsRef.on('child_added', snap => {
    console.log("Added " + snap.key);
});

newsRef.on('child_changed', snap => {
    console.log("Changed " + snap.key);
});

newsRef.on('child_removed', snap => {
    console.log("Removed " + snap.key);
});
<<<<<<< HEAD
=======
*/
