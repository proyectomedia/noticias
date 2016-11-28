var cheerio = require('cheerio');
var bluebird = require('bluebird');
var Promise = bluebird;
var _ = require('lodash');
var moment = require('moment-timezone');

var request = require("../lib/requestAsync");
var config = require("../config");
var scrapData = require("../lib/scrapData");
var generateId = require('../lib/generateId');
var util = require('../lib/util');
var moment = require('moment-timezone');

var dbConfig = require('../lib/db');
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

var dot = require('mongo-dot-notation');
var flatten = dot.flatten;
var op = dot.Operators;
var fs = require('fs');
var wstream = fs.createWriteStream(__dirname + '/../monkeylearn.log', {flags : 'a'});
function invokeScrapper(url) {

    var promises = [];

    var pages = config.pages.filter(page => page.active && (url ? (page.url == url) : true));

    return Promise.map(pages, configPage => {

        var method = configPage.verb.toLowerCase() + "Async";

        console.log("[Scrapping] Running scrapper: '" + url + "'");
        return request[method](configPage.url)
            .then(html => {

                console.log("[Scrapping] Response received for: '" + configPage.scrapper + "' (" + configPage.url + ")");

                var $;

                if (configPage.format === 'json') {

                    $ = JSON.parse(html.body)

                } else {

                    $ = cheerio.load(html.body);

                }


                var scrapper = require(`./scrappers/${configPage.scrapper}`);
                var aux=scrapper($, configPage, html.body);
            //    console.log("\n[antes de Scrapp data]\n"+ aux);
                return scrapData(aux)
                    .then(data => data.reduce((news, pageNews) => {

                                        if(pageNews.length) //Array of news
                                        {
                                            news = news.concat(pageNews);
                                        }
                                        else //Single news
                                        {
                                            news.push(pageNews);
                                        }

                                        return news;
                                    }, [])
                                    .map(newsItem => {

                                        //Assign default properties
                                        newsItem = generateId(Object.assign(newsItem, configPage.defaults || {}));

                                        //Debugging mode
                                        if(configPage.debug)
                                        {
                                            console.log(newsItem);
                                        }

                                        return newsItem;
                                     }));

            })
            .catch(console.error);

    });
}

function* updatecategories(limit){
try{
  limit = limit || 5;
  var db = yield MongoClient.connect(dbConfig.mongoUri);

  var collection = db.collection(dbConfig.collection);
  var sortIndex = { };
  //sortIndex['published.' + 'actualidad'] = 1;
  var sort={ 'published.actualidad':1, priority: -1, date: -1  };
  _.assign(sortIndex,sort)
 collection.createIndex(sortIndex);
 var categoriesQueryClause = { categories: { $in: [ 'actualidad' ]}};
 var isalgoritmo = { algorithm: {$exists:'true'}, algorithm:"true"};

 var news = yield collection
                 .find({
                     $and: [

                         isalgoritmo

                     ]
                 })
              //   .sort(sortIndex)
                 .limit(limit)
                 .toArray();
wstream.write("ingreso a las:"+ moment().format('LLL')+"\n");
for (i in news){
  wstream.write(news[i].source+"\n noticia_titulo:"+news[i].title+"\n")

  var text = news[i].title+news[i].content;
  if (text.length>10){
  var categoria=yield util.findcategory(text);
  if (categoria!=""){

    console.log("entro a monkeylearn:"+news[i].title+", Monkeylearn selecciono : "+categoria);
    var categorias= categoria.split("-");
    var cat=categorias[0];
    console.log("insertar en categoria:"+categorias[0]);
     console.log("");
     var operation = yield collection.update(
         {
           $and: [
            {_id: news[i]._id}
             ]
           },
           {
            $set:{algorithm:"done"}
            }
         );


// var formar={
//   categories:{cat},
//   published:{
//     cat:0
//   }
// };
// var format2 = { };
// format2['published.' + cat] = 0;
// var sort={ algorithm: "done" };
// //  sortIndex = { priority: -1, date: -1  };
//  _.assign(format2,sort)
// console.log(format2);
// var instructions = dot.flatten(formar);
//
//   var operation = yield collection.update(
//     {
//       $and: [
//        {_id: news[i]._id},
//        {categories:{$nin:[categorias[0]]}}
//         ]
//       },
//       {
//         $push: { categories: cat },
//
//        $set:format2
//        }
//     );
//     console.log(JSON.stringify(operation, {indent: true}));
//
  };
};
};
 wstream.end();
  db.close();


}
catch(err){
   console.log(err);
}
}

function* getRecentNews(limit, category, nrepublish)
{
  try{
        limit = limit || 5;
        category = category || "politica";

        var db = yield MongoClient.connect(dbConfig.mongoUri);

        // Get the news collection
        var collection = db.collection(dbConfig.collection);

        var sortIndex = { };
         sortIndex['published.' + category] = 1;
        var sort={ priority: -1, date: -1  };
      //  sortIndex = { priority: -1, date: -1  };
         _.assign(sortIndex,sort)
        console.log("obtiene getrecentnews :");
        console.log(sortIndex);
        collection.createIndex(sortIndex);
        var b=moment().format();
        var c=moment().add(1, 'days').format();
        var d=moment().add(-1, 'days').format();
        var rangedate = { date: {$gte:d,$lt:c}}
        var categoriesQueryClause = { categories: { $in: [ category ]}};

        var publishedQueryClause = { };
        publishedQueryClause['published.' + category] = { $lte: nrepublish };

        var news = yield collection
                        .find({
                            $and: [
                                categoriesQueryClause,
                                publishedQueryClause,
                                rangedate
                            ]
                        })
                        .sort(sortIndex)
                        .limit(limit)
                        .toArray();

        db.close();

        return news;
      }
      catch(err){

         console.log(err);
      }
}

function* markAsPublished(news, category) {

   try{
        var db = yield MongoClient.connect(dbConfig.mongoUri);

        // Get the news collection
        var collection = db.collection(dbConfig.collection);

        var updateObject = {
            published: {

            }
        };



       var valor=(news.published && (news.published[category]>=0))
      // console.log(valor);
        if(valor){
         updateObject.published[category]=news.published[category] + 1;
      //   console.log("");
      //    console.log(updateObject);
         var query = flatten(updateObject);
      //   console.log(JSON.stringify(query));
         var operation = yield collection.updateOne({ _id: news._id }, query);

       };



        db.close();
}
catch(err){

   console.log(err);
}

}

function* fetchAndSave(scrapperId) {

try{
        var db = yield MongoClient.connect(dbConfig.mongoUri);

        // Get the news collection
        var collection = db.collection(dbConfig.collection);

        console.log("[FetchAndSave] Scrapper: " + scrapperId);
        var newsArray = yield invokeScrapper(scrapperId);
        var news = _.flatten(newsArray);

        for(var i = 0; i < news.length; i++)
        {
           var a="";

           if (news[i].date===undefined){
             a=moment().format();
             console.log("Es un scraper sin fecha");
             console.log(news[i].source);
             console.log("se le puso la fecha del momento");

           }else{
          //   console.log("Diario: "+news[i].source+"-   -fecha:"+news[i].date);
             a=moment(news[i].date).format();
           }

           var b=moment().add(-1, 'days').format();

          if(a>b){
            var newsItem = news[i];
            var title=util.fixedparrafo(newsItem.title);
            var subtitle=util.fixedparrafo(newsItem.subtitle);
            var content=util.fixedparrafo(newsItem.content);

            //console.log(title);
          //  console.log(subtitle);
          //  console.log(content);

            newsItem.title=title;
            newsItem.subtitle=subtitle;
            newsItem.content=content;

            newsItem.published = {};
            newsItem.categories.forEach(e => newsItem.published[e] = op.$setOnInsert(0));

            var mongoEntity = flatten(newsItem);

           var operation = yield collection.updateOne({ _id: newsItem._id }, mongoEntity, { upsert: true });

            if(operation.result.ok > 0)
            {
                console.log("[FetchAndSave] Scrapper: " + scrapperId + ", Document: " + newsItem._id + " successfully " + (operation.result.nModified > 0 ? "updated" : "added"));
            }
            else
            {
                console.log("[FetchAndSave] Scrapper: " + scrapperId + ", Document: " + newsItem._id + " cannot be saved in DB");
            }
          }else{
              console.log("[FetchAndSave] Scrapper: " + scrapperId + ", Document: " + news._id + " no saved for out dates range :" +news.date + " and date is:" +moment().format());
          }
        }

        db.close();
        return news;
    }
      catch(err){

        console.log("Se cayo en scrap/index");

         console.log(err);
      }



}


module.exports = {
   updatecategories: bluebird.coroutine(updatecategories),
    fetchAndSave: bluebird.coroutine(fetchAndSave),
    getRecentNews: bluebird.coroutine(getRecentNews),
    markAsPublished: bluebird.coroutine(markAsPublished)
};
