const config = require("../config");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const session = require("express-session");
const mysqlSession = require("express-mysql-session");

/*Middlewares */
function currentUser(request, response, next) {
    if (request.session.currentUser != null) {
        response.locals.userEmail = request.session.currentUser;
        response.locals.userName = request.session.currentName;
        response.locals.userImage = request.session.currentImage;
        response.locals.userId = request.session.currentId;
        next();
    } else {
        response.redirect("/login");
    }
}


module.exports = {
    currentUser
}