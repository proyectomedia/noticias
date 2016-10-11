module.exports = function scrapData(scrappedPromises) {

    return Promise
        .all(scrappedPromises)
        .then(data => {

            var data = data.filter(e => e);
            if (data.length > 0) return data;

            throw new Error("All requests failed!!");
        });

}

