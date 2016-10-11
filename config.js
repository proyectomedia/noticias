var config = {
    "global": {
        "limit": 3,
        "active": false
    },
    "pages": [
        {
            "url": "http://www2.trabajo.gob.pe/prensa/notas-de-prensa/",
            "scrapper": "trabajo.gob.pe"
        },
        {
            "url": "http://www.sbn.gob.pe/noticias_hist.php",
            "scrapper": "snb.gob.pe",
            "limit": 2
        },
        {
            "url": "http://www.promperu.gob.pe/services/ListarNovedadesEspanol.aspx",
            "scrapper": "promperu.gob.pe",
            "limit": 1,
            "format": "json",
            "active": true
        }
        
    ]
}

config.pages = config
    .pages
    .map(page => Object.assign({}, config.global, page))

module.exports = config;