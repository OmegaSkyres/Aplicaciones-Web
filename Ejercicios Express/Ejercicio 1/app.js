"use strict";
const http = require("http");
const url = require("url");
const path = require("path");
const express = require("express");

const app = express();

var pregunta = "¿Cuál es tu color favorito?";
var opciones = [{
        texto: "Rojo",
        numeroVotos: 0
    },
    {
        texto: "Azul",
        numeroVotos: 0
    },
    {
        texto: "Verde",
        numeroVotos: 0
    },
    {
        texto: "Otro",
        numeroVotos: 0
    }
];




// var pregunta = "¿Qué país elegirías para vivir?";
// var opciones = [{
//         texto: "EEUU",
//         numeroVotos: 0
//     },
//     {
//         texto: "Italia",
//         numeroVotos: 0
//     },
//     {
//         texto: "Australia",
//         numeroVotos: 0
//     },
//     {
//         texto: "Japón",
//         numeroVotos: 0
//     }
// ];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const ficherosEstaticos =
    path.join(__dirname, "public");

app.use(express.static(ficherosEstaticos));


app.get("/", function(request, response) {
    // response.status(200);
    response.render("encuesta", { opciones: opciones, pregunta: pregunta });
});


app.get("/encuesta_get", function(request, response) {
    // Actualizar la variable opciones

    opciones.forEach(function(opcion) {
        if (opcion.texto == request.body.opcion) {
            opcion.numeroVotos++;
        }

    });
    // enviar la plantilla
    response.render("resultados", { opciones: opciones });
});




app.listen(3000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});