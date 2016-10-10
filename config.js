module.exports = {
    "pages": [
        {
            "url": "http://www2.trabajo.gob.pe/prensa/notas-de-prensa/",
            "scrapper": "trabajo.gob.pe",
            "selectors": {
                "posts": "ul.posts-list li",
                "link": "h2 a",
                "institute": 'meta[name=description][content!=""]'
            }
        }
    ]
}