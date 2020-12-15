//====================================================================
// Ejemplo get
//====================================================================
"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));


const ficherosEstaticos = path.join(__dirname, "public");

app.use(morgan("dev"));
app.use(express.static(ficherosEstaticos));


// app.get("/procesar_get", function(request, response) {
//     let sexoStr = "No especificado";
//     switch (request.query.sexo) {
//         case "H":
//             sexoStr = "Hombre";
//             break;
//         case "M":
//             sexoStr = "Mujer";
//             break;
//     }
//     response.render("infoForm", {
//         nombre: request.query.nombre,
//         edad: request.query.edad,
//         sexo: sexoStr,
//         fumador: (request.query.fumador === "ON" ? "Sí" : "No")
//     });
// });

app.post("/procesar_post", function(request,response) {
    console.log(request.body);
    let sexoStr = "No especificado";
    switch (request.body.sexo) {
        case "H":
            sexoStr = "Hombre";
            break;
        case "M":
            sexoStr = "Mujer";
            break;
    }
    response.render("infoForm", {
        nombre: request.body.nombre,
        edad: request.body.edad,
        sexo: sexoStr,
        fumador: (request.body.fumador === "ON" ? "Sí" : "No")
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