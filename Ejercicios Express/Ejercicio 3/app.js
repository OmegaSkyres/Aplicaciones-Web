"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan")
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended : true}));

let nombre = "usuario";
let password = "1234";
let usuario_identificado = false;

function identificacionRequerida(request, response, next) {
    if (usuario_identificado) {
        next();
    } else {
        response.redirect("/login");
    }
}
    app.get("/", function(request, response){
        response.status(200);
        response.render("login");
    });

    app.get("/login", function(request, response){
        response.status(200);
        response.render("login");
    });

    app.get("/inicio", function(request, response){
        response.status(200);
        response.render("inicio");
    });

    // app.get("/secreto", function(request, response){
    //     response.status(200);
    //     response.render("secreto");
    // });
    
    // app.get("/otro_secreto", function(request, response){
    //     response.status(200);
    //     response.render("otro_secreto");
    // });

    app.get("/secreto", identificacionRequerida, function(request, response){
        response.status(200);
        response.render("secreto");
    });
    
    app.get("/otro_secreto", identificacionRequerida, function(request, response){
        response.status(200);
        response.render("otro_secreto");
    });

    app.get("/publico", function(request, response){
        response.status(200);
        response.render("publico");
    });

    app.post("/login", function(request, response) {

        if ((request.body.nombre === nombre) && (request.body.password === password)) {
            usuario_identificado = true;
            response.redirect("/inicio");
        } else {
            usuario_identificado = false;
            response.redirect("/login");
        }
    });

    app.listen(3000, function(err) {
        if (err) {
            console.error("No se pudo inicializar el servidor: " +
                err.message);
        } else {
            console.log("Servidor arrancado en el puerto 3000");
        }
    });
    