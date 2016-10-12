var config = {
    "global": {
        "limit": 2,
        "active": false
    },
    "pages": [
        {
            "url": "http://www2.trabajo.gob.pe/prensa/notas-de-prensa/",
            "scrapper": "01.trabajo.gob.pe",
            "limit": 3,
            //"active": true
        },
        {
            "url": "http://www.sbn.gob.pe/noticias_hist.php",
            "scrapper": "02.snb.gob.pe",
            "limit": 2,
            //"active": true
        },
        {
            "url": "http://www.promperu.gob.pe/services/ListarNovedadesEspanol.aspx",
            "scrapper": "03.promperu.gob.pe",
            "limit": 1,
            "format": "json",
            //"active": true
        },
        {
            "url": "https://www.inei.gob.pe/prensa/noticias/",
            "scrapper": "04.inei.gob.pe",
            "limit": 2,
            //"active": true
        },
        {
            "url": "https://www.indecopi.gob.pe/noticias",
            "scrapper": "05.indecopi.gob.pe",
            "limit": 1,
            //"active": true
        },
        {
            "url": "http://www.cultura.gob.pe/es/comunicacion/noticias",
            "scrapper": "06.cultura.gob.pe",
            "limit": 2,
            //"active": true
        },
        {
            "url": "http://www.inaigem.gob.pe/NotasDePrensa",
            "scrapper": "07.inaigem.gob.pe",
            "limit": 2,
            //"active": true
        },
        {
            "url": "http://www.sernanp.gob.pe/noticias1",
            "scrapper": "08.sernanp.gob.pe",
            "limit": 3,
            //"active": true
        },
        {
            "url": "http://www.minam.gob.pe/notas-de-prensa/",
            "scrapper": "09.minam.gob.pe",
            "limit": 2,
            //"active": true
        },
        {
            "url": "http://www.minam.gob.pe/medios/",
            "scrapper": "09.minam.gob.pe",
            "limit": 1,
            "active": true
        },
    ]
}

config.pages = config
    .pages
    .map(page => Object.assign({}, config.global, page))

module.exports = config;