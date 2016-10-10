var Promise = require("bluebird");
var request = require('request');

Promise.promisifyAll(request);

module.exports = request;