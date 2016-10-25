var fb= require("./fbpages");



function sacarpostyguardar(paginas){
  var ide;
  alert(paginas.length);
    for (i in paginas){
       ide=paginas[i].id.toString();

       face.extraernoticia('71263708835',function(response){

      var data = {};

               data.category="";
               data.priority="";
               data.id=response.id;
               data.date=response.posts.data[0].created_time;
               data.type=response.posts.data[0].type;
            //   data.type=response.posts.data[0].type;
               data.name=response.name;
               data.username=response.username;
               data.link=unshortUrl(response.posts.data[0].link);
               data.message=response.posts.data[0].message;
               data.title=response.posts.data[0].name;
               data.description="";
               data.picture=response.posts.data[0].full_picture;
               data.source=response.posts.data[0].caption;

          if (response.posts.data[0].description ){
                 data.description=response.posts.data[0].description}

          if ((response.posts.data[0].link.indexOf(response.link))>=0) || response.website.indexOf(response.posts.data[0].caption)  {
                   //colocar categoria
                   //guardar en base de datos
          }
             /*
             //sino tiene el enlace valido comprobar si es un link externo a traves de comrpobarlo con nuestro propio arreglo donde esta su url
             for (j=0;j<paginas.length;j++){


               var int=paginas[j].url.indexOf(response.posts.data[0].caption);

               if (int>0){//es un articulo valido asi que envialo como en un post a nuestra servidor para analizar que tipo de articulo es ahi.



                 }
             }
             */
     });





   };



};
