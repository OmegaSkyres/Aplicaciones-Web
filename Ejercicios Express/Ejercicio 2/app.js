"use strict";
const http = require("http");
const url = require("url");
const path = require("path");
const express = require("express");
const { response } = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const ficherosEstaticos = path.join(__dirname, "public");

app.use(express.static(ficherosEstaticos));

bodyParser
let usuarios = ["Javier Montoro", "Dolores Vega", "Beatriz Nito"];

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/users.html", function(request, response) {
    response.status(200);
    response.render("users", { usuarios: usuarios});
});

app.get("/borrar/:indice" , function(request, response){
    usuarios.splice(request.params.indice, 1);
    response.redirect("/users.html");
});

app.get("/usersb.html", function(request, response) {
    response.status(200);   
    response.render("usersb", { usuarios: usuarios});
});

app.post("/borrar" , function(request, response){ //Apartado b
    usuarios.splice(request.body.ident, 1);
    response.redirect("/usersb.html");
});

app.get("/public/styles/usersStyle.css", function(request, response) {
    response.sendFile(path.join(__dirname, "public", "styles", "usersStyle.css"));
});

// app.get("/encuesta_get", function(request, response) {
//     // Actualizar la variable opciones

//     usuarios.forEach(function(opcion) {
//         if (opcion.texto == request.query.) {
//             opcion.numeroVotos++;
//         }

//     });
//     // enviar la plantilla
//     response.render("resultados", { opciones: opciones });
// });


app.listen(3000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});