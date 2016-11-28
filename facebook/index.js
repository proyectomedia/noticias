var fb= require("./fbpages");
var cat= require("../lib/categoria");
var face= require("../lib/apiface");
var u= require("../lib/util");
var sha1 = require('sha1');
var unshort = require('unshort');

var bluebird = require('bluebird');
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var dbConfig = require('../lib/db');
var dot = require('mongo-dot-notation');
var flatten = dot.flatten;
var op = dot.Operators;


function* sacarpostyguardar(paginas){
  var ide;
  console.log("Periodicos :");
  for (i in paginas){

    try{

       ide=paginas[i].id.toString();


      var response = yield face.extractNews(ide);

    //  console.log(response);
      var data = {};
               data.category="";
               data.categories="";
               data.priority=0;
              // data.published=0;
               data.fb_id=response.id;
               data.date=response.posts.data[0].created_time;
               data.type=response.posts.data[0].type;
               data.source=response.name;
               data.fb_source_username=response.username;
               data.subtitle=response.posts.data[0].message;
               data.title=response.posts.data[0].name;
               data.content="";
               data.imageUrl=response.posts.data[0].full_picture;
               data.source_website=response.posts.data[0].caption;
               data.files=[];


          if (response.posts.data[0].description ){data.description=response.posts.data[0].description};

          var link = yield u.unshortUrl2(response.posts.data[0].link);

          if (typeof link!== undefined || link !== null){
          response.posts.data[0].link=link;
          data.url=link;
          var categoria=" ";

          if (response.posts.data[0].link.indexOf(response.link)>=0){
                        data.group="facebook";

                         categoria = cat.categoriafacebook(response);

          }else {
             if (response.website.indexOf(response.posts.data[0].caption)>=0){
                     data.group="webs";

                       categoria = cat.categoriafacebook(response);

             }
          };

          data.category=categoria;
           data.categories=[categoria];
          data._id=sha1(data.url);
          if (categoria=="actualidad"){data.algorithm="true"}
         //  console.log(" ");
         //  console.log("_id :"+data._id);
         //  console.log("group :"+data.group);
         //  console.log("categoria :"+data.category);
         //  console.log("prioridad: "+data.priority);

         //  console.log("fecha :"+data.date);
         //  console.log("tipo-type :"+data.type);
          //
         //  console.log("name :"+data.source);
         //  console.log("username :"+data.username);
          //
         //  console.log("link :"+data.url);
         //  console.log("mensaje :"+data.subtitle);
         //  console.log("titulo  :"+data.title);
         //  console.log("caption :"+data.source_website);
         //  console.log("website  :"+response.website);


         if (data.category!=" "){


            console.log("News : "+data.source+" -> with category: "+ data.category);


            var db = yield MongoClient.connect(dbConfig.mongoUri);
            var collection = db.collection(dbConfig.collection);
            var updateObject = {
                published: {

                }
            };
            data.published = {};
            data.categories.forEach(e => data.published[e] = op.$setOnInsert(0));
          //  data.published = op.$setOnInsert(0);

            var news = flatten(data);
          //  console.log(news);
            var operation =yield collection.updateOne({ _id: data._id }, news, { upsert: true });

            if(operation.result.ok > 0)
            {
                console.log("Periodico guardado: "+data.source+" Facebook_: " + data._id + " successfully " + (operation.result.nModified > 0 ? "updated" : "added"));
            }
            else
            {
                console.log("Periodico guardado: "+data.source+" Facebook_: " + data._id + " cannot be saved in DB");
            }

               db.close();
        }else{
          console.log("News :"+data.source );
        }
     }else{
        console.log("La noticia  es indefinida no entro periodico :"+response.name );
     }

    }catch(err){
           console.log("Se cayo en  facebook/index, el response es"+response.username+"-link:"+response.link+"-data.link articulo:"+response.posts.data[0].link);
       console.log(err);
    }


  };

};

module.exports ={
  sacarpostyguardar:bluebird.coroutine(sacarpostyguardar)
};
