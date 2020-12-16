const config = require("./config");
const DAOTasks = require("./DAOTasks");
const utils = require("./utils");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

// Crear un servidor Express.js
const app = express();

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia de DAOTasks
const daoT = new DAOTasks(pool);

const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Arrancar el servidor
app.listen(config.port, function(err) {
   if (err) {
       console.log("ERROR al iniciar el servidor");
   }
   else {
       console.log(`Servidor arrancado en el puerto ${config.port}`);
   }
});

app.get("/", function(request, response){
    response.status(200);
    response.redirect("/tasks");
});

app.get("/tasks",function(request,response){
    daoT.getAllTasks("usuario@ucm.es",function(err, result){
        if(err){
            console.log(err.message);
        }
        else {
            response.status(200);   
            response.render("tasks", { tasks: result });
            console.log("Exito en leer tareas");
        }
    });
});

app.post("/addTask", function(request,response){
    let task = utils.createTask(request.body.text);
    daoT.insertTask("usuario@ucm.es",task,function(err,result){
        if(err){
            console.log("Error al insertar una tarea");
        }
        else{
            response.status(200);
            response.redirect("/tasks");
        }   
    })
})

app.get("/finish/:taskId",function(request,response){
    daoT.markTaskDone(request.body.id,function(err,result){
        if(err){
            console.log("Error al marcar como finalizada");
        }
        else{
            response.status(200);
            response.redirect("/tasks");
        }
    })
})

app.get("/deleteCompleted",function(request,response){
    daoT.deleteCompleted("usuario@ucm.es",function(err){
        if(err){
            console.log("Error al borrar completadas");
        }
        else{
            response.status(200);
            response.redirect("/tasks");
        }
    })
})