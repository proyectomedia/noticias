var FB = require('fb');

var config = {
  accessToken: 'EAAOWC0VaRVwBANoKzNAX8zZAHvMEwUqa0hab4vd2XLVQJ98QlZCJHiyv9hNpnXoNAtqwfVN1tkABQCVRd2x2Mxcm9ZAcc6RkmHYxRxmSI6CiNKujZB4xkiCsGbHyg461Twpl1lQk4qr4ZBaRTt08KRZCShGBSGVJ3zsZAznyLEwxAZDZD'
}

module.exports = {
    extractNews: extractNews,
    postNews: postNews    
}

function extractNews(idpagina,callback){
  FB.setAccessToken(config.accessToken);

    FB.api(idpagina,{"fields":"id,name,username,link,phone,start_info,location,cover,emails,website,about,mission,posts.limit(1){created_time,type,message,link,name,description,caption,full_picture,picture,status_type }"},
    function(response) {
      if(!response || response.error) {
        console.log(!response ? 'error occurred' : response.error);
        return;
      }

      return callback(response);

    });
}

function postNews(id, news, callback)
{
  var idpagina = id + "/feed";

  FB.setAccessToken(config.accessToken)

  return FB.api(
          idpagina,
          'post',
          {
            "message": news.subtitle,
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
