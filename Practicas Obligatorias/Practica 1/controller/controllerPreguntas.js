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
const modelPreguntas = require("../models/modelPreguntas");
const modelQuestion = new modelPreguntas(pool); //Creas una instancia de modelUsuarios
const modelUsuarios = require("../models/modelUsuarios");
const modelUser = new modelUsuarios(pool);
const modelRespuestas = require("../models/modelRespuestas");
const modelReply = new modelRespuestas(pool);


function allQuestions(request, response){
    modelQuestion.getAllQuestions(function(error, result){
        if(error){
            result.title = "No existen preguntas";
            response.status(404);
            response.render("questions", {username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, questions : result});
        }
        else{
            let i = 0;
            let questions = [];
            while(i < result.length){
                questions.push(result[i]);
                questions[questions.length-1].etiquetas = [];
                questions[questions.length-1].etiquetas.push(result[i].etiqueta);
                questions[questions.length-1].fecha = new Date(questions[questions.length-1].fecha).getDate()
                                            + "-" + (new Date(questions[questions.length-1].fecha).getMonth() + 1)
                                            + "-" + new Date(questions[questions.length-1].fecha).getFullYear()
                let netiquetas = result[i].numEtiquetas;
                for(let j = 1; j < netiquetas; j++){
                    questions[questions.length-1].etiquetas.push(result[i+j].etiqueta);
                }
                i += netiquetas;
            }

            questions.title = "Todas las Preguntas";
            response.status(200);
            response.render("questions", {username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, questions : questions});
        }
    });

}

function newQuestion(request, response){
    response.status(200);
    response.render("newQuestion", {username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, msg: null})
}

function createQuestion(request, response){
    let etiquetas = request.body.etiquetas;
    etiquetas = etiquetas.split("@");
    etiquetas.shift();
    if(etiquetas.length > 5){
        response.status(500);
        next(err);
    }

    else{
        let pregunta = [];
        pregunta.titulo = request.body.titulo;
        pregunta.cuerpo = request.body.cuerpo;
        pregunta.usuario = response.locals.userId;

        if(etiquetas.length > 0)
            pregunta.etiquetas = etiquetas;

        modelQuestion.createQuestion(pregunta, function(error, result){
            if(error){
                response.status(500);
                next(err);
            }
            else{
                response.status(200);
                response.redirect("/questions");
            }
        })
    }
}

function unansweredQuestions(request, response){
    modelQuestion.getUnansweredQuestions(function(error,result){
        if(error){
            response.status(404);
            response.redirect("/questions");
        }
        else if(result.legth == 0){
            result.title = "No existen pregunas sin Responder";
            response.render("questions" ,{username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, questions: result })
        }
        else{

            let i = 0;
            let questions = [];
            while(i < result.length){
                questions.push(result[i]);
                questions[questions.length-1].etiquetas = [];
                questions[questions.length-1].etiquetas.push(result[i].etiqueta);
                questions[questions.length-1].fecha = new Date(questions[questions.length-1].fecha).getDate()
                                            + "-" + (new Date(questions[questions.length-1].fecha).getMonth() + 1)
                                            + "-" + new Date(questions[questions.length-1].fecha).getFullYear()
                let netiquetas = result[i].numEtiquetas;
                for(let j = 1; j < netiquetas; j++){
                    questions[questions.length-1].etiquetas.push(result[i+j].etiqueta);
                }
                i += netiquetas;
            }

            questions.title = "Preguntas sin responder";
            response.status(404);
            response.render("questions", {username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, questions : questions});
        }
    })

}

function filterTag(request,response){
    modelQuestion.getQuestionsByTag(request.params.tag,function(error, result){
        if(error){
            response.status(404);
            response.redirect("/questions");
        }
        else if(result.legth == 0){
            result.title = "No existe ese tag";
            response.render("questions" ,{username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, questions: result })
        }
        else{

            let i = 0;
            let questions = [];
            while(i < result.length){
                questions.push(result[i]);
                questions[questions.length-1].etiquetas = [];
                questions[questions.length-1].etiquetas.push(result[i].etiqueta);
                questions[questions.length-1].fecha = new Date(questions[questions.length-1].fecha).getDate()
                                            + "-" + (new Date(questions[questions.length-1].fecha).getMonth() + 1)
                                            + "-" + new Date(questions[questions.length-1].fecha).getFullYear()
                let netiquetas = result[i].numEtiquetas;
                for(let j = 1; j < netiquetas; j++){
                    questions[questions.length-1].etiquetas.push(result[i+j].etiqueta);
                }
                i += netiquetas;
            }

            questions.title = "Preguntas con la etiqueta " + "["+request.params.tag+"]";
            response.status(200);
            response.render("questions", {username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, questions : questions});
        }

    });
}

function filterText(request, response){
    modelQuestion.filterQuestion(request.body.texto,function(error,result){
        if(error){
            response.status(404);
            response.redirect("/questions");
        }
        else if(result.legth == 0){
            result.title = "No existen preguntas con ese texto"
            response.render("questions", {username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, questions : result});
        }
        else{
            let i = 0;
            let questions = [];
            while(i < result.length){
                questions.push(result[i]);
                questions[questions.length-1].etiquetas = [];
                questions[questions.length-1].etiquetas.push(result[i].etiqueta);
                questions[questions.length-1].fecha = new Date(questions[questions.length-1].fecha).getDate()
                                            + "-" + (new Date(questions[questions.length-1].fecha).getMonth() + 1)
                                            + "-" + new Date(questions[questions.length-1].fecha).getFullYear()
                let netiquetas = result[i].numEtiquetas;
                for(let j = 1; j < netiquetas; j++){
                    questions[questions.length-1].etiquetas.push(result[i+j].etiqueta);
                }
                i += netiquetas;
            }

            questions.title = "Resultados de la Busqueda " + "["+request.body.texto+"]";
            response.status(200);
            response.render("questions", {username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, questions : questions});
        }

    });
}

function positiveVoteQuestion(request,response){
    modelQuestion.positiveVoteQuestionById(request.params.question,response.locals.userId,function(error,result){
        if(error){
            response.status(404);
        }
        else{
            response.status(200);
            response.redirect("/questions/"+request.params.question);

        }
    });
}

function negativeVoteQuestion(request,response){
    modelQuestion.negativeVoteQuestionById(request.params.question,response.locals.userId,function(error,result){
        if(error){
            response.status(404);
        }
        else{
            response.status(200);
            response.redirect("/questions/"+request.params.question);

        }
    });
}

function detailedQuestion(request, response){
    let answers = [];
    modelQuestion.increaseVisit(request.params.question, response.locals.userId,function(error,result){
        if(error){
            response.status(404);
        }
    })

    modelReply.getReplysByIdQuestion(request.params.question,function(error,result2){
        if(error){
            response.status(404);
        }
        else{
            response.status(200);
            if(result2.length != 1 || result2[0].idR != null){  //Para quitar el caso de la respuesta NULA por el numVotos a 0
                answers = result2;
            }

        }
    })

    modelQuestion.getDetailedQuestion(request.params.question,function(error,result3){
        if(error){
            response.status(404);
        }
        else{
            let i = 0;
            let questions = [];
            while(i < result3.length){
                questions.push(result3[i]);
                questions[questions.length-1].etiquetas = [];
                questions[questions.length-1].etiquetas.push(result3[i].etiqueta);

                questions[questions.length-1].replys = [];
                questions[questions.length-1].replys = answers; //Le añadimos sus respuestas
                questions[questions.length-1].fecha = new Date(questions[questions.length-1].fecha).getDate()
                                            + "-" + (new Date(questions[questions.length-1].fecha).getMonth() + 1)
                                            + "-" + new Date(questions[questions.length-1].fecha).getFullYear()
                let netiquetas = result3[i].numEtiquetas;
                for(let j = 1; j < netiquetas; j++){
                    questions[questions.length-1].etiquetas.push(result3[i+j].etiqueta);
                }
                i += netiquetas;
            }

            response.status(200);
            response.render("detailedQuestion", {username : response.locals.userName, image : response.locals.userImage, userid : response.locals.userId, question : questions[0]});
        }
    })


}


module.exports = {
    allQuestions,
    newQuestion,
    unansweredQuestions,
    createQuestion,
    filterTag,
    filterText,
    detailedQuestion,
    positiveVoteQuestion,
    negativeVoteQuestion
}