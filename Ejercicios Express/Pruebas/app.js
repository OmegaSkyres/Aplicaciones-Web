"use strict";
const path = require("path");   
const express = require("express");
const app = express();


var usuarios = ["Javier Montoro", "Dolores Vega", "Beatriz Nito"];


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname, "public", "bienvenidos.html"));
    }); 
// // app.get("/", function(request, response) {
// //     response.status(200);
// //     response.type("text/plain; charset=utf-8");
// //     response.end("Esta es la página raíz");
// // });

app.get("/users.html", function(request, response) {
    response.status(200);
    response.render("users", { users: usuarios });
    });
    

app.get("/usuarios.html", function(request, response) {
    response.redirect("/users.html");
    });

app.get("/users.html", function(request, response) {
    response.status(200);
    response.type("text/plain; charset=utf-8");
    response.end("Aquí se mostrará la página de usuarios");
});



app.listen(3000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: "+ err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});