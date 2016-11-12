var config = {
    "global": {
        "limit": 2,
        "active": true,
        "priority": 0,
        "verb": "get",
        "debug": true,
        "schedule": []
    },
    "pages": [
        {
            "url": "http://www2.trabajo.gob.pe/prensa/notas-de-prensa/",
            "scrapper": "01.trabajo.gob.pe",
            "limit": 3,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 1,
                "type": "link",
                "source": "Ministerio Del trabajo",
                "source_website": "http://www2.trabajo.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },


            "active": true,

            "schedule": [
                "0 */1 * * * *"  
            ]

        },
        {
            "url": "http://www.sbn.gob.pe/noticias_hist.php",
            "scrapper": "02.snb.gob.pe",
            "limit": 2,
            "defaults": {
                "category": "politica",
                "categories": ["politica", "obras"],
                "priority": 1,
                "type": "link",
                "source": "Superintendencia Nacional de Bienes Estatales",
                "source_website": "http://www.sbn.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },

            "active": true,
            //"active": true

            "schedule": [

                { hour: 13 }  //Runs at 5pm
            ]

        },
        {
            "url": "http://www.promperu.gob.pe/services/ListarNovedadesEspanol.aspx",
            "scrapper": "03.promperu.gob.pe",
            "limit": 1,
            "defaults": {
                "category": "empresas",
                "categories": ["empresas"],
                "priority": 1,
                "type": "link",
                "source": "Comisión de Promoción del Perú para la Exportación y el Turismo",
                "source_website": "http://www.promperu.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "format": "json",
            "schedule": [
                { hour: 13 } //Runs at 12pm
            ]
        },
        {
            "url": "https://www.inei.gob.pe/prensa/noticias/",
            "scrapper": "04.inei.gob.pe",
            "limit": 2,
            "defaults": {
                "category": "actualidad",
                "categories": ["actualidad"],
                "priority": 1,
                "type": "link",
                "source": "Instituto Nacional de Estadística e Informática",
                "source_website": "https://www.inei.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 13 }, //Runs at 10am
                { hour: 17 }  //Runs at 5pm
            ]
        },
        {
            "url": "https://www.indecopi.gob.pe/noticias",
            "scrapper": "05.indecopi.gob.pe",
            "limit": 1,
            "defaults": {
                "category": "actualidad",
                "categories": ["actualidad"],
                "priority": 1,
                "type": "link",
                "source": "Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual",
                "source_website": "https://www.indecopi.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 13 }, //Runs at 12pm
            ]
        },
        {
            "url": "http://www.cultura.gob.pe/es/comunicacion/noticias",
            "scrapper": "06.cultura.gob.pe",
            "limit": 2,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 1,
                "type": "link",
                "source": "Ministerio de Cultura",
                "source_website": "http://www.cultura.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 13 }, //Runs at 10am
                { hour: 17 }  //Runs at 5pm
            ]
        },
        {
            "url": "http://www.inaigem.gob.pe/NotasDePrensa",
            "scrapper": "07.inaigem.gob.pe",
            "limit": 2,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 1,
                "type": "link",
                "source": "Instituto Nacional de Investigación en Glaciares y Ecosistemas de Montaña",
                "source_website": "http://www.inaigem.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 13 }, //Runs at 10am
                { hour: 17 }  //Runs at 5pm
            ]
        },
        {
            "url": "http://www.sernanp.gob.pe/noticias1",
            "scrapper": "08.sernanp.gob.pe",
            "limit": 3,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 1,
                "type": "link",
                "source": "Servicio Nacional de Áreas Naturales Protegidas por el Estado",
                "source_website": "http://www.sernanp.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 10 }, //Runs at 9am
                { hour: 13 },  //Runs at 1pm
                { hour: 17 }  //Runs at 5pm
            ]
        },
        {
            "url": "http://www.minam.gob.pe/notas-de-prensa/",
            "scrapper": "09.minam.gob.pe",
            "limit": 2,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 1,
                "type": "link",
                "source": "Ministerio del Ambiente",
                "source_website": "http://www.minam.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 13 }, //Runs at 10am
                { hour: 17 }  //Runs at 5pm
            ]
        },
        {
            "url": "http://www.minam.gob.pe/medios/",
            "scrapper": "09.1.minam-medios.gob.pe",
            "limit": 4,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 1,
                "type": "link",
                "source": "Ministerio del Ambiente",
                "source_website": "http://www.minam.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 8 }, //Runs at 8am
                { hour: 11 },  //Runs at 11am
                { hour: 14 },  //Runs at 2pm
                { hour: 17 }  //Runs at 5pm
            ]
        },
        {
            "url": "http://www.elperuano.pe/seccion.aspx?sec=1",
            "scrapper": "10.elperuano.pe",
            "limit": 9,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 2,
                "type": "link",
                "source": "El Peruano",
                "source_website": "http://www.elperuano.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 12 }, //Runs at 12pm
            ]
        },
        {
            "url": "http://www.elperuano.pe/seccion.aspx?sec=3",
            "scrapper": "10.elperuano.pe",
            "limit": 9,
            "defaults": {
                "category": "economia",
                "categories": ["economia"],
                "priority": 2,
                "type": "link",
                "source": "El Peruano",
                "source_website": "http://www.elperuano.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 12 }, //Runs at 12pm
            ]
        },
        {
            "url": "http://www.elperuano.pe/seccion.aspx?sec=7",
            "scrapper": "10.elperuano.pe",
            "limit": 8,
            "defaults": {
                "category": "actualidad",
                "categories": ["actualidad"],
                "priority": 2,
                "type": "link",
                "source": "El Peruano",
                "source_website": "http://www.elperuano.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 12 }, //Runs at 12pm
            ]
        },
        {
            "url": "http://www.elperuano.pe/seccion.aspx?sec=2",
            "scrapper": "10.elperuano.pe",
            "limit": 8,
            "defaults": {
                "category": "actualidad",
                "categories": ["actualidad"],
                "priority": 2,
                "type": "link",
                "source": "El Peruano",
                "source_website": "http://www.elperuano.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 12 }, //Runs at 12pm
            ]
        },
        {
            "url": "http://www.elperuano.pe/seccion.aspx?sec=5",
            "scrapper": "10.elperuano.pe",
            "limit": 6,
            "defaults": {
                "category": "actualidad",
                "categories": ["actualidad"],
                "priority": 2,
                "type": "link",
                "source": "El Peruano",
                "source_website": "http://www.elperuano.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 12 }, //Runs at 12pm
            ]
        },
        {
            "url": "http://www.elperuano.pe/seccion.aspx?sec=4",
            "scrapper": "10.elperuano.pe",
            "limit": 3,
            "defaults": {
                "category": "actualidad",
                "categories": ["actualidad"],
                "priority": 2,
                "type": "link",
                "source": "El Peruano",
                "source_website": "http://www.elperuano.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 12 }, //Runs at 12pm
            ]
        },
        {
            "url": "http://diariooficial.elperuano.pe/Normas",
            "scrapper": "11.elperuanonormas.pe",
            "limit": 3,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 0,
                "type": "link",
                "source": "El Peruano",
                "source_website": "http://diariooficial.elperuano.pe/",
                "fb_id": "",
                "fb_source_username": "",
                "imageUrl": "https://k60.kn3.net/E/7/5/D/2/8/ABC.png"
            },
            "schedule": [
                { hour: 12 }, //Runs at 12pm
            ]
        },
        {
            "url": "http://www.pcm.gob.pe/seccion/noticias/notas-de-prensa/",
            "scrapper": "12.pcm.gob.pe",
            "limit": 1,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 2,
                "type": "link",
                "source": "Presidencia del consejo de ministros",
                "source_website": "http://www.pcm.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 12 }, //Runs at 12pm
            ]
        },
        {
            "url": "http://www.presidencia.gob.pe/lista-notas-prensa",
            "scrapper": "13.presidencia.gob.pe",
            "limit": 1,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 2,
                "type": "link",
                "source": "Presidencia",
                "source_website": "http://www.presidencia.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 12 }, //Runs at 12pm
            ]
        },
        {
            "url": "http://www.andina.com.pe/agencia/seccion-politica-17.aspx?sec=17",
            "scrapper": "14.andina.com.pe",
            "limit": 1,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 1,
                "type": "link",
                "source": "Andina",
                "source_website": "http://www.andina.com.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [ "*/20 * * * *" ] //cada media hora porque es un periodico

        },
        {
            "url": "http://www.andina.com.pe/agencia/seccion-economia-2.aspx",
            "scrapper": "14.andina.com.pe",
            "limit": 1,
            "defaults": {
                "category": "economia",
                "categories": ["economia"],
                "priority": 1,
                "type": "link",
                "source": "Andina",
                "source_website": "http://www.andina.com.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [ "*/20 * * * *" ]
        },
        {
            "url": "http://www.andina.com.pe/agencia/seccion-locales-3.aspx",
            "scrapper": "14.andina.com.pe",
            "limit": 1,
            "defaults": {
                "category": "actualidad",
                "categories": ["actualidad", "locales"],
                "priority": 1,
                "type": "link",
                "source": "Andina",
                "source_website": "http://www.andina.com.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [ "*/20 * * * *" ]
        },
        {
            "url": "http://www.andina.com.pe/agencia/seccion-regionales-4.aspx",
            "scrapper": "14.andina.com.pe",
            "limit": 1,
            "defaults": {
                "category": "actualidad",
                "categories": ["actualidad"],
                "priority": 1,
                "type": "link",
                "source": "Andina",
                "source_website": "http://www.andina.com.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [ "*/20 * * * *" ]
        },
        {
            "url": "http://www.rree.gob.pe/noticias/Paginas/Notas_de_Prensa.aspx",
            "scrapper": "15.rree.gob.pe",
            "limit": 1,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 1,
                "type": "link",
                "source": "Ministerio de Relaciones Exteriores del Perú",
                "source_website": "http://www.rree.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [ "* */1 * * *" ]
        },
        {
            "url": "https://www.ositran.gob.pe/publicaciones1/notas-de-prensa.html",
            "scrapper": "16.ositran.gob.pe",
            "limit": 1,
            "defaults": {
                "category": "actualidad",
                "categories": ["actualidad"],
                "priority": 1,
                "type": "link",
                "source": "Organismo Supervisor de la Inversión en Infraestructura de Transporte de Uso Público",
                "source_website": "https://www.ositran.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
            "schedule": [
                { hour: 12 }, //Runs at 12pm
            ]
        },
        {
            "url": "http://www.igss.gob.pe/portal/index.php/joomla/contentall-comcontent-views/category-list",
            "scrapper": "17.igss.gob.pe",
            "limit": 1,
            "defaults": {
                "category": "actualidad",
                "categories": ["actualidad", "salud"],
                "priority": 1,
                "type": "link",
                "source": "Instituto de Gestión de Servicios de Salud",
                "source_website": "http://www.igss.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
        },
        {
            "url": "http://www.minjus.gob.pe/categoria/ultimas-noticias/",
            "scrapper": "18.minjus.gob.pe",
            "limit": 2,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 1,
                "type": "link",
                "source": "Ministerio de Justicia y Derechos Humanos del Perú",
                "source_website": "http://www.minjus.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
        },
        {
            "url": "http://portal.osce.gob.pe/osce/noticias",
            "scrapper": "19.osce.gob.pe",
            "limit": 1,
            "defaults": {
                "category": "politica",
                "categories": [ "politica", "actualidad" ],
                "priority": 1,
                "type": "link",
                "source": "Organismo Supervisor de las Contrataciones del Estado",
                "source_website": "http://portal.osce.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
        },
        {
            "url": "http://www.midis.gob.pe/index.php/es/centro-de-informacion",
            "scrapper": "20.midis.gob.pe",
            "limit": 2,
            "defaults": {
                "category": "politica",
                "categories": ["politica"],
                "priority": 1,
                "type": "link",
                "source": "Organismo Supervisor de las Contrataciones del Estado",
                "source_website": "http://portal.osce.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
        },
        {
            "url": "http://www.minsa.gob.pe/index.asp?op=5#Prensa",
            "scrapper": "21.minsa.gob.pe",
            "limit": 6,
            "defaults": {
                "category": "salud",
                "categories": ["salud"],
                "priority": 1,
                "type": "link",
                "source": "Ministerio de Salud",
                "source_website": "http://www.minsa.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
        },
        {
            "url": "http://policiaperu.tumblr.com/",
            "scrapper": "22.policiaperu.tumblr.com",
            "limit": 1,
            "defaults": {
                "category": "seguridad",
                "categories": ["seguridad"],
                "priority": 1,
                "type": "link",
                "source": "Policia Nacional del Perú",
                "source_website": "http://policiaperu.tumblr.com/",
                "fb_id": "",
                "fb_source_username": ""
            },
        },
        {
            "url": "https://www.mininter.gob.pe/vista-listado-de-noticias",
            "scrapper": "23.mininter.gob.pe",
            "limit": 4,
            "defaults": {
                "category": "seguridad",
                "categories": ["seguridad"],
                "priority": 1,
                "type": "link",
                "source": "Ministerio del Interior del Perú",
                "source_website": "https://www.mininter.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
        },
        {
            "url": "http://www.inpe.gob.pe/contenidosprensa_all.php?direccion=1",
            "scrapper": "24.inpe.gob.pe",
            "limit": 4,
            "defaults": {
                "category": "seguridad",
                "categories": ["seguridad"],
                "priority": 1,
                "type": "link",
                "source": "Instituto Nacional Penitenciario",
                "source_website": "http://www.inpe.gob.pe/",
                "fb_id": "",
                "fb_source_username": ""
            },
        }

    ]
}

config.pages = config
    .pages
    .map(page => Object.assign({}, config.global, page))

module.exports = config;
