var scrap = require('./scrap');

scrap().then(news => {

    news;
    process.exit();

}).catch(err => {

    console.error(err);
    process.exit(1);

});