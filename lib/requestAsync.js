var bluebird = require("bluebird");
var request = require('request');

request = request.defaults({
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36"
    }
});

bluebird.promisifyAll(request);

module.exports = request;