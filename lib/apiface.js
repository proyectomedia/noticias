var FB = require('fb');

module.exports = {

    extraernoticia: extraernoticia,
    publicarnoticia: publicarnoticia

}

function extraernoticia(idpagina,callback){



FB.setAccessToken('EAAOWC0VaRVwBANoKzNAX8zZAHvMEwUqa0hab4vd2XLVQJ98QlZCJHiyv9hNpnXoNAtqwfVN1tkABQCVRd2x2Mxcm9ZAcc6RkmHYxRxmSI6CiNKujZB4xkiCsGbHyg461Twpl1lQk4qr4ZBaRTt08KRZCShGBSGVJ3zsZAznyLEwxAZDZD');

  FB.api(idpagina,{"fields":"id,name,username,link,phone,start_info,location,cover,emails,website,about,mission,posts.limit(1){created_time,type,message,link,name,description,caption,full_picture,picture,status_type }"},
  function(response) {
    if(!response || response.error) {
      console.log(!response ? 'error occurred' : response.error);
      return;
    }

    return callback(response);

  });

}

function publicarnoticia(id,noticia){
  var idpagina=id+"/feed";
//var idpagina="909439029189405/feed"

FB.setAccessToken('EAAOWC0VaRVwBANoKzNAX8zZAHvMEwUqa0hab4vd2XLVQJ98QlZCJHiyv9hNpnXoNAtqwfVN1tkABQCVRd2x2Mxcm9ZAcc6RkmHYxRxmSI6CiNKujZB4xkiCsGbHyg461Twpl1lQk4qr4ZBaRTt08KRZCShGBSGVJ3zsZAznyLEwxAZDZD');


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


//publicar en nodejs

// var request = require('request');
//
// var dataString = 'message=hola&access_token=EAAOWC0VaRVwBAE9EYk3ZAhsZAehJUH9Ar6GZCjjxz9LI5ZCgAz5jOyHLuzZAXpKTzLJzZA7XarUwDZCShNhS5ZA8EuIZApvvkCq41PUudQWTaewwWqxz0C9cJiXpuBmsbgCMg4x5dJcQxM5DKcx0yU7nvK1kfFDiu8DXaXxcICv7eXAZDZD';
//
// var options = {
//     url: 'https://graph.facebook.com/v2.7/909439029189405/feed',
//     method: 'POST',
//     body: dataString
// };
//
// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//     }
// }
//
// request(options, callback);
