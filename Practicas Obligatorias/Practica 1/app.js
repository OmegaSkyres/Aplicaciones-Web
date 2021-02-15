"use strict";

const config = require("./config");
//const utils = require("/.utils");


//-------------------------------------------------Routers------------------------------------------------------//
const routerUsuarios = require("./routers/routerUsuarios");
const routerPreguntas = require("./routers/routerPreguntas");
const routerRespuestas = require("./routers/routerRespuestas.js")


//------------------------------------------------Frameworks----------------------------------------------------//
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const mysqlSession = require("express-mysql-session");
const session = require("express-session");
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "404" });

const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});     

const pool = mysql.createPool(config.mysqlConfig);
const app = express();

const ficherosEstaticos = path.join(__dirname, "public");


//------------------------------------------------Setup------------------------------------------------//


app.use(express.static(ficherosEstaticos));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(middlewareSession);

app.use("/", routerUsuarios);
app.use("/login", routerUsuarios);
app.use("/questions", routerPreguntas);
app.use("/reply", routerRespuestas);


//---------------------------------------------View engine------------------------------------------------------//

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//-------------------------------------------------DAO´S--------------------------------------------------------//
//Creas una instancia de modelUsuarios



//---------------------------------------------Middlewares------------------------------------------------------//

// Captura error 404.

app.use(function(req, res, next) {
    var error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// Error Handler.
app.use(function(error, request, response, next) {
    if (error.status == 404) {
        response.render("error404", {
            url: request.url
        });
    } else {
        response.render("error500", {
            mensaje: error.message,
            pila: error.stack
        });
    }
});




//------------------------------------------Arranque del Servidor-----------------------------------------------//

app.listen(3000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});