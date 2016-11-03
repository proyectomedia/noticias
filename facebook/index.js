var fb= require("./fbpages");
var cat= require("../lib/categoria");
var face= require("../lib/apiface");
var u= require("../lib/util");
var sha1 = require('sha1');
var firebaseApp = require('../lib/db');
var newsRef = firebaseApp.database().ref('news');


function sacarpostyguardar(paginas){
  var ide;
  //alert(paginas.le);
  for (i in paginas){
    console.log(i);
       ide=paginas[i].id.toString();


       face.extraernoticia(ide,function(response){

      var data = {};

               data.category="";
               data.priority="0";
               data.id=response.id;
               data.date=response.posts.data[0].created_time;
               data.type=response.posts.data[0].type;
            //   data.type=response.posts.data[0].type;
               data.name=response.name;
               data.username=response.username;
              // data.link=u.unshortUrl(response.posts.data[0].link);
               data.message=response.posts.data[0].message;
               data.title=response.posts.data[0].name;
               data.content="";
               data.picture=response.posts.data[0].full_picture;
               data.source=response.posts.data[0].caption;

          if (response.posts.data[0].description ){
               console.log("description");
                 data.description=response.posts.data[0].description};



           u.unshortUrl(response.posts.data[0].link)
           .then(function(link){
             console.log(response.name);
             response.posts.data[0].link=link;
             data.link=link;
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
             data._id=sha1(data.link);

            //  console.log(" ");
            //  console.log("_id :"+data._id);
            //  console.log("group :"+data.group);
            //  console.log("categoria :"+data.category);
            //  console.log("prioridad: "+data.priority);
            //  console.log("id: "+data.id);
            //  console.log("fecha :"+data.date);
            //  console.log("tipo-type :"+data.type);
             //
            //  console.log("name :"+data.name);
            //  console.log("username :"+data.username);
             //
            //  console.log("link :"+data.link);
            //  console.log("mensaje :"+data.message);
            //  console.log("titulo  :"+data.title);
            //  console.log("caption :"+data.source);
            //  console.log("website  :"+response.website);


            if (data.category!=" "){

               console.log("base de datos");
               console.log(" ");
               console.log(" ");
               newsRef.orderByKey().equalTo(data._id).once('value', snap => {

                               if (!snap.val()) {
                                   newsRef.child(data.category).child(data._id).set(data);
                               }

                           })


            }

            })
           .catch(function(err){
              console.log("error");
           });
      console.log("llego");

      });

  };
};

module.exports ={ sacarpostyguardar:sacarpostyguardar};
