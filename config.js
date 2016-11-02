var config = {
    "global": {
        "limit": 2,
        "active": false,
        "priority": 0,
        "verb": "get"
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
            "scrapper": "09.1.minam-medios.gob.pe",
            "limit": 1,
            //"active": true
        },
        {
            "url": "http://www.elperuano.pe/seccion.aspx?sec=1",
            "scrapper": "10.elperuano.pe",
            "limit": 9,
            //"active": true,
            "category": "politica",
            "priority": 2
        },
        {
            "url": "http://www.elperuano.pe/seccion.aspx?sec=3",
            "scrapper": "10.elperuano.pe",
            "limit": 9,
            //"active": true,
            "category": "economia",
            "priority": 2
        },
        {
            "url": "http://www.elperuano.pe/seccion.aspx?sec=7",
            "scrapper": "10.elperuano.pe",
            "limit": 8,
            //"active": true,
            "category": "actualidad",
            "priority": 2
        },
        {
            "url": "http://www.elperuano.pe/seccion.aspx?sec=2",
            "scrapper": "10.elperuano.pe",
            "limit": 8,
            //"active": true,
            "category": "actualidad",
            "priority": 2
        },
        {
            "url": "http://www.elperuano.pe/seccion.aspx?sec=5",
            "scrapper": "10.elperuano.pe",
            "limit": 6,
            //"active": true,
            "category": "actualidad",
            "priority": 2
        },
        {
            "url": "http://www.elperuano.pe/seccion.aspx?sec=4",
            "scrapper": "10.elperuano.pe",
            "limit": 3,
            //"active": true,
            "category": "actualidad",
            "priority": 2
        },
        {
            "url": "http://diariooficial.elperuano.pe/Normas",
            "scrapper": "11.elperuanonormas.pe",
            "limit": 3,
            //"active": true,
            "category": "politica",
            "img": "https://k60.kn3.net/E/7/5/D/2/8/ABC.png",
            "priority": 2
        },
        {
            "url": "http://www.pcm.gob.pe/seccion/noticias/notas-de-prensa/",
            "scrapper": "12.pcm.gob.pe",
            "limit": 1,
            //"active": true,
            "category": "politica",
            "priority": 2
        },
        {
            "url": "http://www.presidencia.gob.pe/lista-notas-prensa",
            "scrapper": "13.presidencia.gob.pe",
            "limit": 1,
            //"active": true,
            "category": "politica",
            "priority": 2
        },
        {
            "url": "http://www.andina.com.pe/agencia/seccion-politica-17.aspx?sec=17",
            "scrapper": "14.andina.com.pe",
            //"active": true,
            "category": "politica",
            "priority": 1
        },
        {
            "url": "http://www.andina.com.pe/agencia/seccion-economia-2.aspx",
            "scrapper": "14.andina.com.pe",
            //"active": true,
            "category": "economia",
            "priority": 1
        },
        {
            "url": "http://www.andina.com.pe/agencia/seccion-locales-3.aspx",
            "scrapper": "14.andina.com.pe",
            //"active": true,
            "category": "actualidad",
            "priority": 1
        },
        {
            "url": "http://www.andina.com.pe/agencia/seccion-regionales-4.aspx",
            "scrapper": "14.andina.com.pe",
            //"active": true,
            "category": "departamentos",
            "priority": 1
        },
        {
            "url": "http://www.rree.gob.pe/noticias/Paginas/Notas_de_Prensa.aspx",
            "scrapper": "15.rree.gob.pe",
            "limit": 1,
            //"active": true,
            "category": "politica",
            "priority": 1
        },
        {
            "url": "https://www.ositran.gob.pe/publicaciones1/notas-de-prensa.html",
            "scrapper": "16.ositran.gob.pe",
            "limit": 1,
            //"active": true,
            "category": "actualidad",
            "priority": 1
        },
        {
            "url": "http://www.igss.gob.pe/portal/index.php/joomla/contentall-comcontent-views/category-list",
            "scrapper": "17.igss.gob.pe",
            "limit": 1,
            //"active": true,
            "category": "actualidad",
            "priority": 1
        },
        {
            "url": "http://www.minjus.gob.pe/categoria/ultimas-noticias/",
            "scrapper": "18.minjus.gob.pe",
            "limit": 2,
            //"active": true,
            "category": "actualidad",
            "priority": 1
        },
        {
            "url": "http://portal.osce.gob.pe/osce/noticias",
            "scrapper": "19.osce.gob.pe",
            "limit": 1,
            //"active": true,
            "category": "actualidad"
        },
        {
            "url": "http://www.midis.gob.pe/index.php/es/centro-de-informacion",
            "scrapper": "20.midis.gob.pe",
            "limit": 2,
            //"active": true,
            "category": "politica"
        },
        {
            "url": "http://www.minsa.gob.pe/index.asp?op=5#Prensa",
            "scrapper": "21.minsa.gob.pe",
            "limit": 6,
            //"active": true,
            "category": "salud"
        },
        {
            "url": "http://policiaperu.tumblr.com/",
            "scrapper": "22.policiaperu.tumblr.com",
            "limit": 1,
            "active": true,
            "category": "seguridad"
        },
        
    ]
}

config.pages = config
    .pages
    .map(page => Object.assign({}, config.global, page))

module.exports = config;