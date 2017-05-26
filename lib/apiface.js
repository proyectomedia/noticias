var FB = require('fb');
var bluebird = require('bluebird');


var config = {
//  accessToken: 'EAAOWC0VaRVwBANoKzNAX8zZAHvMEwUqa0hab4vd2XLVQJ98QlZCJHiyv9hNpnXoNAtqwfVN1tkABQCVRd2x2Mxcm9ZAcc6RkmHYxRxmSI6CiNKujZB4xkiCsGbHyg461Twpl1lQk4qr4ZBaRTt08KRZCShGBSGVJ3zsZAznyLEwxAZDZD'
//  accessToken: '1009400082482524|L-TNiqAJGE5SrOUjzPbpAE-baL0'
accessToken:'EAAOWC0VaRVwBAEpspBHDFvYWGNxZCYZBamGjBW28NTgNaYSYAZBZCuuXsA47WnGBjNlWEZBqm2HPKXc2QwkvAoVO2YGTj11mCZCnAXZCM7qU7XXJYPJ7P3ftFRmYZCHv7XkclJ70IVkxv8454NJYZACcySe5ZA0SpZAoLgZD'
}

module.exports = {
    extractNews: extractNews,
    postNews: postNews
}



function extractNews(idpagina){
  FB.setAccessToken(config.accessToken);


  return new bluebird(function (resolve, reject){
        FB.api(idpagina,{"fields":"id,name,username,link,phone,start_info,location,cover,emails,website,about,mission,posts.limit(1){created_time,type,message,link,name,description,caption,full_picture,picture,status_type }"},
        function(response) {
          if(!response || response.error) {
            console.log(!response ? 'error occurred' : response.error);
          }
          resolve(response);
       });

  });
}

function postNews(id,token, news, callback)
{
  try{
  var idpagina = id + "/feed";
  var adicional="";
  FB.setAccessToken(token);
  if (news.url.indexOf(".pdf")>=0){
    adicional=" .Ver noticia en el sitio oficial  en pdf"
  }
  var mesagg=" #Ultimo_Minuto  # "+news.source+ ": "+news.subtitle+" " + adicional;
  console.log("se publicara en:"+id+"categoria:" + news.category);
  console.log("el link:"+news.url);


  //var idpagina="909439029189405/feed"
  //method=GET&path=me
// %2C /
//  %3F ?
// %3D =
//%20 espacio


//FB.api(idpagina,'post',{"message":noticia.message,"link":noticia.link,"picture":"http://e03-elmundo.uecdn.es/assets/multimedia/imagenes/2015/11/13/14474300157302.jpg","name":"este es un gran titulo","caption":"el loco.pe"},

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
  return FB.api(
          idpagina,
          'post',
          {
            "message": mesagg,
            "link": news.url,
            "picture": news.imageUrl || "",
            "name": news.title,
            "caption": news.source_website
          },
          function(res) {
              if(!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                  console.log('Header:');
                console.log(JSON.stringify(res.headers));

                return;
              }
//X-Page-Usage : {'call_count' : 85, 'total_cputime' : 56, 'total_time' : 60}
              if(callback) callback(news);


              console.log('Post Id: ' + res.id);
              console.log('Header:'+res.headers);
          });
        }catch(err){
           console.log("entro al error de postnew de facebook :" +err);
        }
}
