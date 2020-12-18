//====================================================================
// Ejercicio 3
//====================================================================
"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");



const app = express();
const MySQLStore = mysqlSession(session);

const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "404" });

const middlewareSession = session({
    saveUninitialized: true,
    secret: "foobar34",
    resave: false,
    store: sessionStore
    });

app.use(middlewareSession);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

let nombre = "usuario";
let password = "1234";
let usuario_identificado = false;

function identificacionRequerida(request, response, next) {
    if (request.session.currentUser !== undefined) {
        next();
    } else {
        response.redirect("/login");
    }
}

// function rutasVisitadas(request, response, next) {

//     if (request.session.rutas === undefined)
  
//       request.session.rutas = [];
//     request.session.rutas.push(request.url)
//     console.log(request.session);
//     next();
  
// }
  
  
  
//   app.use(rutasVisitadas);


  app.use(function(request, response, next) {
    console.log("request.session.currentUser ========> ", request.session.currentUser);
    next();
  });
  


app.get("/", function(request, response) {
    response.redirect("/login");
});


app.get("/login", function(request, response) {
    response.render("login",  {errorMsg: null});

});

app.get("/inicio", function(request, response) {
    response.render("inicio");
});

app.post("/login", function(request, response) {
    if ((request.body.nombre === nombre) && (request.body.password === password)) {
      request.session.currentUser = request.body.nombre;
      // usuario_identificado = true;
      response.redirect("/inicio");
    } else {
      // usuario_identificado = false;
      response.render("login", { errorMsg: "Email y/o contraseña no válidos" });
      // response.redirect("/login");
  
    }
  
  });


// app.get("/secreto", function(request, response) {
//     response.render("secreto");
// });

// app.get("/otro_secreto", function(request, response) {
//     response.render("otro_secreto");
// })

app.get("/secreto", identificacionRequerida, function(request, response) {
    response.render("secreto");
});

app.get("/otro_secreto", identificacionRequerida, function(request, response) {
    response.render("otro_secreto");
});

app.get("/publico", function(request, response) {
    response.render("publico");
});


app.listen(3000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});