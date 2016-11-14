var FB = require('fb');
var bluebird = require('bluebird');


var config = {
  accessToken: 'EAAOWC0VaRVwBANoKzNAX8zZAHvMEwUqa0hab4vd2XLVQJ98QlZCJHiyv9hNpnXoNAtqwfVN1tkABQCVRd2x2Mxcm9ZAcc6RkmHYxRxmSI6CiNKujZB4xkiCsGbHyg461Twpl1lQk4qr4ZBaRTt08KRZCShGBSGVJ3zsZAznyLEwxAZDZD'
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

function postNews(id, news, callback)
{
  var idpagina = id + "/feed";
  var adicional="";
  FB.setAccessToken(config.accessToken);
  if (news.url.indexOf(".pdf")>=0){
    adicional=" "
  }
  var mesagg=" #Lo Ultimo "+news.source+ ": "+news.subtitle+" " + adicional;

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
                return;
              }

              if(callback) callback(news);

              console.log("se publico");
              console.log('Post Id: ' + res.id);
          });
}
