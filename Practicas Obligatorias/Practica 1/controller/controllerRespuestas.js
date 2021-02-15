"use strict"
const config = require("../config");

//------------------------------------------------Frameworks----------------------------------------------------//
const path = require("path");
const mysql = require("mysql");
const pool = mysql.createPool(config.mysqlConfig);
const express = require("express");

const app = express();
//-------------------------------------------------DAO´S--------------------------------------------------------//
const modelPreguntas = require("../models/modelPreguntas");
const modelQuestion = new modelPreguntas(pool);
const modelUsuarios = require("../models/modelUsuarios");
const modelUser = new modelUsuarios(pool);
const modelRespuestas = require("../models/modelRespuestas");
const modelReply = new modelRespuestas(pool);

function createReply(request, response){
    let respuesta = [];
    respuesta.question = request.params.id;
    respuesta.cuerpo = request.body.cuerpo;
    respuesta.user = response.locals.userId;

    modelReply.crearRespuesta(respuesta, function(error, result){
        if(error){
            response.status(400);
            response.redirect("/questions",{username : response.locals.userName, image : response.locals.userImage, msg: "Error al crear la respuesta" });
        }
        else{
            response.status(200);
            response.redirect("/questions");
        }
    })
}

function newReply(request, response){
    response.status(200);
    response.render("newReply", {username : response.locals.userName, image : response.locals.userImage, msg: null})
}

function positiveVoteAnswer(request,response){
    modelReply.positiveVoteReplyById(request.params.answer,response.locals.userId,function(error,result){
        if(error){
            response.status(400);
        }
        else{
            response.status(200);
            response.redirect("/questions");

        }
    });
}

function negativeVoteAnswer(request,response){
    modelReply.negativeVoteReplyById(request.params.answer,response.locals.userId,function(error,result){
        if(error){
            response.status(400);
        }
        else{
            response.status(200);
            response.redirect("/questions");

        }
    });
}

module.exports = {
   createReply,
   newReply,
   positiveVoteAnswer,
   negativeVoteAnswer
}