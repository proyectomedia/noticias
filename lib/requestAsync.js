var bluebird = require("bluebird");
var request = require('request');

bluebird.promisifyAll(request);

module.exports = request;