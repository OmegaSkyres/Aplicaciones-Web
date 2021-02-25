"use strict"

const controllerUsuarios = require("../controller/controllerUsuarios");
const userSessionRouter = require("./routerSessions");



//------------------------------------------------Frameworks----------------------------------------------------//
const express = require("express");
var router = express.Router();
const path = require("path");
const multer = require("multer");
const multerFactory = multer({
    dest:  path.join("./","public","images")
});

//-------------------------------GET - Sección para implementar las peticiones GET -----------------------------//


router.get("/", controllerUsuarios.root);

router.get("/login", controllerUsuarios.login);

router.get("/register", controllerUsuarios.register);

router.get("/home", userSessionRouter.currentUser, controllerUsuarios.home);

router.get("/logout", controllerUsuarios.logout);

router.get("/imagen/:id", userSessionRouter.currentUser, controllerUsuarios.getImage);

router.get("/users/profile/:id", userSessionRouter.currentUser, controllerUsuarios.getUserProfile)

router.get("/users", userSessionRouter.currentUser, controllerUsuarios.getUsers)


//---------------------------- POST - Sección para implementar las peticiones POST -----------------------------//

router.post("/procesar_register", multerFactory.single("adjunto"), controllerUsuarios.procesarRegister);

router.post("/procesar_login", controllerUsuarios.procesarLogin);

router.post("/users/process_searchUsu", userSessionRouter.currentUser, controllerUsuarios.procesarSearchUsu)


module.exports = router;