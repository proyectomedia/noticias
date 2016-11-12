var sha1 = require('sha1');

module.exports = function generateId(obj) {

    return Object.assign(obj, {
        _id: sha1(JSON.stringify(obj.url))
    })
}