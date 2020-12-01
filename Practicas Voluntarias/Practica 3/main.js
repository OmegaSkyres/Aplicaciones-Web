"use strict";

const mysql = require("mysql");
const DAOUsers = require("./DAOUsers");
const DAOTasks = require("./DAOTasks");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "p3"
});



//Para probar 

let daoUser = new DAOUsers(pool);
let daoTask = new DAOTasks(pool);

daoUser.isUserCorrect("robertito@gmail.com", "12345", cb_isUserCorrect);
daoUser.getUserImageName("robertito@gmail.com", cb_getUserImageName);
daoTask.getAllTasks("robertito@gmail.com", cb_getAllTask);
daoTask.insertTask("danielcito@gmai.com", {"text" : "task23", "done": false, "tags":["tag1", "tag2", "tag3"]}, cb_insertTask);
daoTask.deleteCompleted("robertito@gmail.com",cb_deleteCompleted);
daoTask.markTaskDone("3",cb_markeTaskDone);


function cb_isUserCorrect(err, result){
   if (err) {
       console.log(err.message);
   } else if (result) {
       console.log("Usuario y contraseña correctos");
   } else {
       console.log("Usuario y/o contraseña incorrectos");
   }
}

function cb_getUserImageName(err, result){
    if(err){
        console.log(err.message);
    } else if (result) {
        console.log(result);
    } else {
        console.log(err.message);
    }

}

function cb_getAllTask(err, result){
    if(err) {
        console.log(err.message);
    }
    else if(result){
        console.log(result);
    } else {
        console.log(err.message);
    }
}

function cb_insertTask(err, result){
    if(err) {
        console.log(err.message);
    }
    
}

function cb_deleteCompleted(err, result){
    if(err) {
        console.log(err.message);
    }
}

function cb_markeTaskDone(err, result){
    if(err) {
        console.log(err.message);
    }
}

