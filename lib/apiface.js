var FB = require('fb');

module.exports = {

    extraernoticia: extraernoticia,
    publicarnoticia: publicarnoticia

}

function extraernoticia(idpagina,callback){


  var accessToken = FB.getAccessToken();

  console.log("accessToken extraernoticia :" +accessToken);
  var timeout = FB.options('timeout');
  console.log("time extraernoticia :" +timeout);
  FB.api('71263708835',{"fields":"id,name,username,link,phone,start_info,location,cover,emails,website,about,mission,posts.limit(1){created_time,type,message,link,name,description,caption,full_picture,picture,status_type }"},
  function(response) {
    if(!response || response.error) {
      console.log(!response ? 'error occurred' : response.error);
      return;
    }
    console.log(response.id);
    console.log(response.name);

    return callback(response);

  });

}

function publicarnoticia(id,noticia){
  var idpagina=id+"/feed";
//var idpagina="909439029189405/feed"
var accessToken = FB.getAccessToken();
  console.log("accessToken publicarnoticia :" +accessToken);
  var timeout = FB.options('timeout');
  console.log("time publicarnoticia :" +timeout);
//FB.setAccessToken('EAAOWC0VaRVwBAFu4BFeCKIUxZCRsrdaPDoGkHVOTSkYOJX90BSuffXnBqZAo0CfYbTZBQ5dOSTF5bsG0pkUQqB87taPTzlAR9e1pdCUGVOyeeGXsGnV7b7rrZCS2BX9tEuRT0F2a2M5QZAARbmnQv19vM5hSZCwtxLzpvBIZCbpVU8HGFVc21U4');
//let message=

//FB.api(idpagina,'post',{"message":noticia.message,"link":noticia.link,"picture":"http://e03-elmundo.uecdn.es/assets/multimedia/imagenes/2015/11/13/14474300157302.jpg","name":"este es un gran titulo","caption":"el loco.pe"},
FB.api(idpagina,'post',{"message":noticia.message,"link":noticia.link,"picture":noticia.picture,"name":noticia.name,"caption":noticia.caption},
  function(res) {
       if(!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
      }
      console.log("se publico");
      console.log('Post Id: ' + res.id);
  });

}
