//app.js
// -------
"use strict";
const express = require("express");
const app = express();
const path = require("path")


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));

app.get("/usuarios", function(request, response, next) {
    console.log("/usuarios");
    fs.readFile("noexiste.txt", function(err, contenido) {
        if (err) {
            next(err);
        } else {
            request.contenido = contenido;
        }
    });
});

app.get("/procesar_get", function(request, response) {
    let sexoStr = "No especificado";
    switch (request.query.sexo) {
        case "H":
            sexoStr = "Hombre";
            break;
        case "M":
            sexoStr = "Mujer";
            break;
    }
    response.render("infoForm", {
        nombre: request.query.nombre,
        edad: request.query.edad,
        sexo: sexoStr,
        fumador: (request.query.fumador === "ON" ? "Sí" : "No")
    });
});

app.use(middlewareNotFoundError);

app.use(function(error, request, response, next) {
    // Código 500: Internal server error
    response.status(500);
    response.render("error500", {
        mensaje: error.message,
        pila: error.stack
    });
});

app.listen(3000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});

function middlewareNotFoundError(request, response) {
    console.log("404");
    response.status(404);
    response.render("error404", {
        url: request.originalUrl
    });
}