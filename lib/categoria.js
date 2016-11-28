var FB = require('fb');
var sha1 = require('sha1');
var fs = require('fs');
var wstream = fs.createWriteStream(__dirname + '/../monkeylearn.log', {flags : 'a'});
var u=require('./util');
var moment = require('moment-timezone');
module.exports = {

    categoriafacebook: categoriafacebook


}

function categoriafacebook(response){
var cat=" ";

try{
 if(response.posts.data[0].link.indexOf("facebook")>=0){
         //Es una photo o video facebook-Por el momento no hacer nada
         //enviar a monkey.com para sacar categoria del message.
         //if la pagina republica su foto o video,el message se pasa a description, en este caso como ya republico entonces fuera
         if (typeof response.posts.data[0].message !== undefined || response.posts.data[0].message !== null){
          if (response.posts.data[0].message.length>10){//texto tiene una oracion con sentido para analizar
         wstream.write("\nIngreso a las:"+moment().format()+"\nPhoto o video de facebook:"+response.posts.data[0].type+"\n Username:"+response.username+"\n Mensaje:"+response.posts.data[0].message+"\n" )
         u.findcategory(response.posts.data[0].message)
          .then(categoria=>{
           console.log("entro a monkeylearn:"+response.posts.data[0].message+", Monkeylearn selecciono : "+categoria);
         });
       }
     }
 }
  else {
   //es una noticia de su web - link
 // console.log("else");
 // console.log(response.username);
  let path=response.username;
  switch(path){
    case "elcomercio.pe":
         if (response.posts.data[0].link.indexOf("elcomercio.pe/politica")>=0){
           cat="politica";response.posts.data[0].category="politica"; break;
         }else if (response.posts.data[0].link.indexOf("elcomercio.pe/gastronomia")>=0){
           cat="gastronomia";response.posts.data[0].category="gastronomia"; break;
         }else if ((response.posts.data[0].link.indexOf("elcomercio.pe/ciencias")>=0) ||
            (response.posts.data[0].link.indexOf("elcomercio.pe/ciencias")>=0)){
            cat="tec";response.posts.data[0].category="TEC"; break;
         }else if (response.posts.data[0].link.indexOf("elcomercio.pe/sociedad")>=0){
              cat="actualidad";  response.posts.data[0].category="actualidad" ; break;
         }else if ((response.posts.data[0].link.indexOf("elcomercio.pe/economia/peru")>=0) ||
         (response.posts.data[0].link.indexOf("elcomercio.pe/economia/mercados")>=0) ||
         (response.posts.data[0].link.indexOf("elcomercio.pe/economia/mundo")>=0)){
           cat="economia";response.posts.data[0].category="economia"; break;
         }else if ((response.posts.data[0].link.indexOf("elcomercio.pe/economia/negocios")>=0) ||
          (response.posts.data[0].link.indexOf("elcomercio.pe/economia/dia-1")>=0) ||
         (response.posts.data[0].link.indexOf("elcomercio.pe/economia/ejecutivos")>=0)){
          cat="empresas";response.posts.data[0].category="empresas";break;
        }else if (response.posts.data[0].link.indexOf("elcomercio.pe/whatsapp")>=0){
            cat="denuncias";response.posts.data[0].category="denuncias"; break;

        };

    case "rppnoticias":

       if (response.posts.data[0].link.indexOf("rpp.pe/politica")>=0){
         cat="politica";response.posts.data[0].category="politica"; break;
       }else if (response.posts.data[0].link.indexOf("elcomercio.pe/NOHAY")>=0){
         cat="gastronomia";response.posts.data[0].category="gastronomia"; break;
       }else if (response.posts.data[0].link.indexOf("rpp.pe/tecnologia")>=0){
          cat="tec";response.posts.data[0].category="TEC"; break;
       }else if ((response.posts.data[0].link.indexOf("rpp.pe/lima/actualidad/")>=0)||
          (response.posts.data[0].link.indexOf("rpp.pe/peru")>=0)){
              cat="actualidad";response.posts.data[0].category="actualidad" ; break;
       }else if (response.posts.data[0].link.indexOf("rpp.pe/economia/economia")>=0) {
         cat="economia";response.posts.data[0].category="economia"; break;
       }else if (response.posts.data[0].link.indexOf("elcomercio.pe/NOHAY")>=0){
        cat="empresas";response.posts.data[0].category="empresas";break;
      }else if ((response.posts.data[0].link.indexOf("rpp.pe/lima/seguridad/")>=0)||
          (response.posts.data[0].link.indexOf("rpp.pe/lima/accidentes/")>=0)){
        cat="denuncias";  response.posts.data[0].category="denuncias"; break;

      }else if (response.posts.data[0].link.indexOf("rpp.pe/lima/obras/")>=0){
        cat="obras";  response.posts.data[0].category="obras"; break;

      };

  case"CorreoPeru":

    if (response.posts.data[0].link.indexOf("diariocorreo.pe/politica/")>=0){
    cat="politica";  response.posts.data[0].category="politica"; break;
    }else if (response.posts.data[0].link.indexOf("diariocorreo.pe/gastronomia/")>=0){
    cat="gastronomia";  response.posts.data[0].category="gastronomia"; break;
    }else if (response.posts.data[0].link.indexOf("rpp.pe/NOHAY")>=0){
      cat="tec"; response.posts.data[0].category="TEC"; break;
    }else if ((response.posts.data[0].link.indexOf("diariocorreo.pe/ciudad/")>=0)||
    (response.posts.data[0].link.indexOf("diariocorreo.pe/edicion")>=0)){
        cat="actualidad";   response.posts.data[0].category="actualidad" ; break;
    }else if (response.posts.data[0].link.indexOf("diariocorreo.pe/economia/")>=0) {
      cat="economia";response.posts.data[0].category="economia"; break;
    }else if (response.posts.data[0].link.indexOf("elcomercio.peNOHAY")>=0){
    cat="empresas"; response.posts.data[0].category="empresas";break;
   }else if (response.posts.data[0].link.indexOf("rpp.pe/lima/seguridad/NOHAY")>=0){
      cat="denuncias"; response.posts.data[0].category="denuncias"; break;

   }else if (response.posts.data[0].link.indexOf("rpp.pe/lima/NOHAY")>=0){
      cat="obras"; response.posts.data[0].category="obras"; break;

   };

  case "larepublicape":

        if ((response.posts.data[0].link.indexOf("larepublica.pe/politica/")>=0)||
          (response.posts.data[0].link.indexOf("larepublica.pe/impresa/politica/")>=0)){
        cat="politica";  response.posts.data[0].category="politica"; break;
        }else if (response.posts.data[0].link.indexOf("diariocorreo.pe/gastronomia//NOHAY")>=0){
        cat="gastronomia";  response.posts.data[0].category="gastronomia"; break;
        }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
        cat="tec";   response.posts.data[0].category="TEC"; break;
        }else if ((response.posts.data[0].link.indexOf("larepublica.pe/data")>=0)||
        (response.posts.data[0].link.indexOf("larepublica.pe/sociedad/")>=0)){
        cat="actualidad";       response.posts.data[0].category="actualidad" ; break;
        }else if ((response.posts.data[0].link.indexOf("larepublica.pe/economia")>=0)||
          (response.posts.data[0].link.indexOf("larepublica.pe/impresa/economia")>=0)){
        cat="economia";  response.posts.data[0].category="economia"; break;
      }else if (response.posts.data[0].link.indexOf("elcomercio.pe/NOHAY")>=0){
        cat="empresas"; response.posts.data[0].category="empresas";break;
       }else if (response.posts.data[0].link.indexOf("rpp.pe/lima/seguridad/NOHAY")>=0){
        cat="denuncias";   response.posts.data[0].category="denuncias"; break;

       }else if (response.posts.data[0].link.indexOf("rpp.pe/lima/NOHAY")>=0){
        cat="obras";   response.posts.data[0].category="obras"; break;

       };

case   "peru21":
    if (response.posts.data[0].link.indexOf("peru21.pe/politica")>=0){
    cat="politica";  response.posts.data[0].category="politica"; break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="gastronomia";  response.posts.data[0].category="gastronomia"; break;
    }else if (response.posts.data[0].link.indexOf("peru21.pe/tecnologia")>=0){
    cat="tec";   response.posts.data[0].category="TEC"; break;
    }else if (response.posts.data[0].link.indexOf("peru21.pe/actualidad")>=0){
    cat="actualidad";       response.posts.data[0].category="actualidad" ; break;
    }else if (response.posts.data[0].link.indexOf("peru21.pe/economia")>=0){
    cat="economia";  response.posts.data[0].category="economia"; break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="empresas"; response.posts.data[0].category="empresas";break;
   }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="denuncias";   response.posts.data[0].category="denuncias"; break;

   }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="obras";   response.posts.data[0].category="obras"; break;

   };
case   "Tromepe":
    if (response.posts.data[0].link.indexOf("trome.pe/actualidad/politica")>=0){
    cat="politica";  response.posts.data[0].category="politica"; break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="gastronomia";  response.posts.data[0].category="gastronomia"; break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
        response.posts.data[0].category="TEC"; break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
      response.posts.data[0].category="actualidad" ; break;
    }else if (response.posts.data[0].link.indexOf("trome.pe/actualidad/economia")>=0){
    cat="economia";  response.posts.data[0].category="economia"; break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="empresas";   response.posts.data[0].category="empresas";break;
   }else if ((response.posts.data[0].link.indexOf("trome.pe/actualidad/policiales")>=0)||
    (response.posts.data[0].link.indexOf("trome.pe/actualidad/nacional/inseguridad")>=0)||
    (response.posts.data[0].link.indexOf("trome.pe/actualidad/inseguridad")>=0)){
    cat="denuncias";   response.posts.data[0].category="denuncias"; break;

   }else if (response.posts.data[0].link.indexOf("nohay")>=0){
    cat="obras";   response.posts.data[0].category="obras"; break;

   };

case   "Gestionpe":
    if (response.posts.data[0].link.indexOf("gestion.pe/politica")>=0){
    cat="politica";  response.posts.data[0].category="politica"; break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="gastronomia";  response.posts.data[0].category="gastronomia"; break;
    }else if (response.posts.data[0].link.indexOf("gestion.pe/tecnologia")>=0){
    cat="tec";   response.posts.data[0].category="TEC"; break;
    }else if ((response.posts.data[0].link.indexOf("gestion.pe/economia")>=0)||
     (response.posts.data[0].link.indexOf("gestion.pe/mercados")>=0)){
    cat="economia";  response.posts.data[0].category="economia"; break;
    }else if ((response.posts.data[0].link.indexOf("gestion.pe/tu-dinero")>=0)||
    (response.posts.data[0].link.indexOf("gestion.pe/opinion")>=0)||
    (response.posts.data[0].link.indexOf("gestion.pe/tu-dinero")>=0)){
    cat="actualidad";       response.posts.data[0].category="actualidad" ; break;
    }else if ((response.posts.data[0].link.indexOf("gestion.pe/empresas")>=0)||
    (response.posts.data[0].link.indexOf("gestion.pe/empleo-management")>=0)){
  cat="empresas";   response.posts.data[0].category="empresas";break;
   }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="denuncias";   response.posts.data[0].category="denuncias"; break;

   }else if (response.posts.data[0].link.indexOf("gestion.pe/inmobiliaria")>=0){
    cat="obras";   response.posts.data[0].category="obras"; break;

   };

case   "publimetrope":
    if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="politica";  response.posts.data[0].category="politica"; break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="gastronomia";    response.posts.data[0].category="gastronomia"; break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="tec";     response.posts.data[0].category="TEC"; break;
    }else if (response.posts.data[0].link.indexOf("/nohay")>=0){
  cat="actualidad";         response.posts.data[0].category="actualidad" ; break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="economia";    response.posts.data[0].category="economia"; break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="empresas";   response.posts.data[0].category="empresas";break;
   }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="denuncias";     response.posts.data[0].category="denuncias"; break;

   }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="obras";     response.posts.data[0].category="obras"; break;

   };


case   "DiarioOjo":
if (response.posts.data[0].link.indexOf("ojo.pe/ciudad/")>=0){
cat="actualidad";  response.posts.data[0].category="actualidad"; break;
}else if (response.posts.data[0].link.indexOf("ojo.pe/policial/")>=0){
cat="denuncias";  response.posts.data[0].category="denuncias"; break;
};


case   "diario.expreso":
     if ((response.posts.data[0].link.indexOf("expreso.com.pe/politica")>=0)||
        (response.posts.data[0].link.indexOf("expreso.com.pe/judicial")>=0)){
    cat="politica";   response.posts.data[0].category="politica"; break;
     }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="gastronomia";   response.posts.data[0].category="gastronomia"; break;
     }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="tec";    response.posts.data[0].category="TEC"; break;
     }else if ((response.posts.data[0].link.indexOf("expreso.com.pe/nacional")>=0) ||
       (response.posts.data[0].link.indexOf("expreso.com.pe/actualidad")>=0)){
    cat="actualidad";        response.posts.data[0].category="actualidad" ; break;
     }else if (response.posts.data[0].link.indexOf("expreso.com.pe/economia")>=0){
    cat="economia";   response.posts.data[0].category="economia"; break;
     }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="empresas";    response.posts.data[0].category="empresas";break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="denuncias";      response.posts.data[0].category="denuncias"; break;

    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="obras";    response.posts.data[0].category="obras"; break;

    };


  case   "SEMANAeconomica":

         if ((response.posts.data[0].link.indexOf("semanaeconomica.com/article/legal-y-politica/politica")>=0) ||
          (response.posts.data[0].link.indexOf("semanaeconomica.com/article/legal-y-politica/sector-publico")>=0)){
      cat="politica";     response.posts.data[0].category="politica"; break;
         }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
      cat="gastronomia";     response.posts.data[0].category="gastronomia"; break;
         }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="tec";        response.posts.data[0].category="TEC"; break;
         }else if (response.posts.data[0].link.indexOf("/nohay")>=0){
      cat="actualidad";          response.posts.data[0].category="actualidad" ; break;
         }else if ((response.posts.data[0].link.indexOf("semanaeconomica.com/article/mercados-y-finanzas")>=0)||
          (response.posts.data[0].link.indexOf("semanaeconomica.com/article/economia")>=0)){

    cat="economia";       response.posts.data[0].category="economia"; break;
         }else if ((response.posts.data[0].link.indexOf("semanaeconomica.com/article/management")>=0)||
          (response.posts.data[0].link.indexOf("semanaeconomica.com/article/sectores-y-empresas")>=0)||
          (response.posts.data[0].link.indexOf("semanaeconomica.com/article/legal-y-politica/marco-legal")>=0)){
    cat="empresas";      response.posts.data[0].category="empresas";break;
        }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="denuncias";        response.posts.data[0].category="denuncias"; break;

        }else if (response.posts.data[0].link.indexOf("semanaeconomica.com/article/sectores-y-empresas/inmobiliario")>=0){
    cat="obras";        response.posts.data[0].category="obras"; break;

        };


case "canalnoficial":

    if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
    cat="politica";  break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="gastronomia"; break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="tec"; break;
}else if ((response.posts.data[0].link.indexOf("canaln.pe/actualidad")>=0)||
  (response.posts.data[0].link.indexOf("canaln.pe/peru")>=0)){
  cat="actualidad"; break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="economia";   break;
    }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="empresas"; break;
}else if (response.posts.data[0].link.indexOf("canaln.pe/alerta-noticias")>=0){
  cat="denuncias";  break;

   }else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
  cat="obras"; break;

   };





case "capital967":
if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="politica";  break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="gastronomia"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="tec"; break;
}else if (response.posts.data[0].link.indexOf("capital.com.pe/actualidad")>=0){
cat="actualidad"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="economia";   break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="empresas"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="denuncias";  break;

}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="obras"; break;

};



case "seriestv.peliculas":

if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="politica";  break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="gastronomia"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="tec"; break;
}else if (response.posts.data[0].link.indexOf("laprensa.peru.com/espectaculos")>=0){
cat="actualidad"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="economia";   break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="empresas"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="denuncias";  break;

}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="obras"; break;

};

//laprensa.peru.com/actualidad  -> mundo peru salud economia medio ambiente
case "laprensaperu":
if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="politica";  break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="gastronomia"; break;
}else if (response.posts.data[0].link.indexOf("laprensa.peru.com/tecnologia-ciencia")>=0){
cat="tec"; break;
}else if (response.posts.data[0].link.indexOf("/nohay")>=0){
cat="actualidad"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="economia";   break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="empresas"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="denuncias";  break;

}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="obras"; break;

};



case "diariounolevano":
if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="politica";  break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="gastronomia"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="tec"; break;
}else if (response.posts.data[0].link.indexOf("/nohay")>=0){
cat="actualidad"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="economia";   break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="empresas"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="denuncias";  break;

}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="obras"; break;

};


case "NuevoSolPeru":
if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="politica";  break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="gastronomia"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="tec"; break;
}else if (response.posts.data[0].link.indexOf("/nohay")>=0){
cat="actualidad"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="economia";   break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="empresas"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="denuncias";  break;

}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="obras"; break;

};



case "OjoPublico":
if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="politica";  break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="gastronomia"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="tec"; break;
}else if (response.posts.data[0].link.indexOf("ojo-publico.com")>=0){
cat="actualidad"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="economia";   break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="empresas"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="denuncias";  break;

}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="obras"; break;

};


case "IDLReporteros":

if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="politica";  break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="gastronomia"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="tec"; break;
}else if (response.posts.data[0].link.indexOf("idl-reporteros.pe")>=0){
cat="actualidad"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="economia";   break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="empresas"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="denuncias";  break;

}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="obras"; break;

};


case "ASBANCPeru":

if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="politica";  break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="gastronomia"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="tec"; break;
}else if (response.posts.data[0].link.indexOf("asbanc.com.pe/Paginas/Noticias")>=0){
cat="actualidad"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="economia";   break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="empresas"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="denuncias";  break;

}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="obras"; break;

};


case "RumboEconomicoGlobal":

if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="politica";  break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="gastronomia"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="tec"; break;
}else if (response.posts.data[0].link.indexOf("/nohay")>=0){
cat="actualidad"; break;
}else if (response.posts.data[0].link.indexOf("/nohay")>=0){
cat="economia";   break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="empresas"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="denuncias";  break;

}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="obras"; break;

};


case "agenciandina":

if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="politica";  break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="gastronomia"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="tec"; break;
}else if (response.posts.data[0].link.indexOf("andina.com.pe/agencia")>=0){
cat="actualidad"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="economia";   break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="empresas"; break;
}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="denuncias";  break;

}else if (response.posts.data[0].link.indexOf("/NOHAY")>=0){
cat="obras"; break;

};


default:  break;
   };
  };
// console.log(response.posts.data[0].link);
//  console.log(cat);
 return cat;
 }catch(err){
   console.log("Se cayo en lib/categoria");
   console.log(err);

 }
}
