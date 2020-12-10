const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const morgan = require("morgan");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

let rojo = 0, azul = 0, verde = 0, otro = 0;

app.get("/procesar_get", function (request, response) {
    switch (request.query.color) {
        case "rojo": rojo++; break;
        case "azul": azul++; break;
        case "verde": verde++; break;
        case "otro": otro++; break;
    }
    response.render("tabla", {
        "rojo": rojo,
        "azul": azul,
        "verde": verde,
        "otro": otro
    });
});

app.get("/public/styles/encuestaStyle.css", function(request, response) {
    response.sendFile(path.join(__dirname, "public", "styles", "encuestaStyle.css"));
});

app.listen(3000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " + err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});

