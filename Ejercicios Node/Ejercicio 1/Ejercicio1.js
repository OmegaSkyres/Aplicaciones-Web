"use strict"

const fs = require("fs");


function eliminaBlancos(){
    fs.readFile("fich.txt", {encoding: "utf-8"},
    function(err,contenido) {
        if (err) {
            console.log("Error al leer el fichero.");
        } else {
            console.log("Fichero leido correctamente.");
            console.log(contenido);
            let nuevoContenido = contenido.replace(/[ ]+/g, " ");
            fs.writeFile("fich.txt",nuevoContenido, {encoding: "utf-8"},
            function(err) {
                if (err) {
                    console.log("Error al escribir el fichero.");
                } else {
                    console.log("Fichero escrito correctamente.");
                }
            });
        
            
        }
    });
    
}

console.log(eliminaBlancos());


    