"use strict"

const config = require("../config");
//const utils = require("../utils");

//------------------------------------------------Frameworks----------------------------------------------------//
const path = require("path");
const mysql = require("mysql");
const pool = mysql.createPool(config.mysqlConfig); // Crear un pool de conexiones a la base de datos de MySQL
const express = require("express");

const app = express();

//-------------------------------------------------DAO´S--------------------------------------------------------//
const modelUsuario = require("../models/modelUsuarios");
const modelUser = new modelUsuario(pool); //Creas una instancia de modelUsuarios

function root(request, response){
    response.status(200);
    response.redirect("/login");
}

function login(request, response){
    response.status(200);
    response.render("login", {errorMsg: null });
}

function register(request, response){
    response.status(200);
    response.render("register", {msg: null});

}


function procesarRegister(request,response){
    const email= request.body.email;
    const password= request.body.password;
    const password2= request.body.password2;
    const regexEmail= new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if(password !== password2){
        response.status(400);
        response.render("register",{msg: "Las contraseñas no coinciden" });
    }
    else{
        if(email !== "" && password !== "" && password.length >= 4 && regexEmail.test(email)){
            let usuario = [];
            usuario.email = request.body.email;
            usuario.username = request.body.nickname;
            usuario.password = request.body.password;
            if(request.file) {
                usuario.image = request.file.filename;
            }
            else{
                usuario.image = Math.floor(Math.random() * 3) + ".png";
            }

            modelUser.crearUsuario(usuario, function(error, result){
                if(error){
                    response.status(400);
                    response.render("register",{msg: "Error al crear el usuario" });;
                }
                else{
                    response.status(200);
                    response.redirect("/login");
                }
            });
        }

        else{
            response.status(400);
            response.render("register",{msg: "El formato de los campos no es valido" });
        }

    }
}

function procesarLogin(request, response){
    const email = request.body.email;
    const password = request.body.password;

    modelUser.identificarUsuario(email, password, function(err, result){
        if(err){
            response.render("login", {errorMsg : err})
        }
        else{
            request.session.currentUser = request.body.email;
            request.session.currentName = result[0].username;
            request.session.currentImage = result[0].imagen;
            request.session.currentId = result[0].idUsuario;
            response.redirect("/home");
        }
    });


}

function logout(request,response){
    request.session.destroy();
    response.redirect("/login");
}

function home(request, response){
    response.status(200);
    response.render("home",{username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, });

}

function getImage(request,response){
    let pathImg = path.join(__dirname, "../","public", "images", request.params.id);
    response.sendFile(pathImg);
}

function getUserProfile(request,response){
    let medals = []
    modelUser.getMedalsByUserId(request.params.id,function(error,result){
        if(error){
            response.status(400);
        }
        else{
            medals = result;
            modelUser.getUserProfileById(request.params.id, function(error,result2){
                if(error){
                    response.status(404);
                    console.log("No se ha encontrado el usuario");
                    next(new Error("Not Found"));
                }
                else{
                    response.status(200);
                    response.render("profile", {username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, medals: medals, userData : result2[0]})
                }
            })
        }
    });

}

function getUsers(request, response){
    modelUser.leerTodos(function(error, result){
        if(error){
            response.status(400);
            response.redirect("/home",{msg: "Error al mostrar los usuarios" });;
        }
        else{
            response.status(200);
            result.title = "Usuarios"
            response.render("users", {username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, users : result});
        }
    })
}

function procesarSearchUsu(request, response){
    modelUser.filterUser(request.body.user,function(error,result){
        if(error){
            response.status(400);
        }
        else{
            response.status(200);
            result.title = "Usuarios filtrados por [" + request.body.user + "]"
            response.render("users" ,{username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, users : result})
        }
    });
}


module.exports = {
    root,
    login,
    logout,
    register,
    home,
    procesarRegister,
    procesarLogin,
    getImage,
    getUserProfile,
    getUsers,
    procesarSearchUsu
}
