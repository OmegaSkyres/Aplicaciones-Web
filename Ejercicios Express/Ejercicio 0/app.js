"use strict"

const path = require("path");
const express = require("express");
const app = express();


app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));

const usuarios = [
    {nombre: "Carmen San Juan",
     numero: "8976"
    },
    {nombre: "Adrián Lucas",
     numero: "8977"
    },
    {nombre: "Natalia Rodríguez",
     numero: "8978"
    }]
    
    

    app.listen(3000, (err) => {
        if(err) console.log(err.message);
        else console.log("Escuchando en el puerto 3000!");
    });

    app.get("/usuarios.html", function(request, response) {
        response.status(200);
        response.render("usuarios", { users: usuarios });
        });

     app.get("/users.html", function(request, response) {
        response.status(200);
        response.redirect("/usuarios.htmlç");
        });

     app.get("/socios.html", function(request, response) {
        response.status(200);
        response.redirect("/usuarios.html");
        });

    app.get("/usuarios.css", function(request, response) {
        
        });
        