const config = require("./config");
const path = require("path");
const express = require("express");
const utils = require("./utils");
// const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const DAOTasks = require("./DAOTasks");
const DAOUsers = require("./DAOUsers");
const { nextTick } = require("process");
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "p3" });
    
    const middlewareSession = session({
        saveUninitialized: true,
        secret: "foobar34",
        resave: false,
        store: sessionStore
        });
    
    app.use(middlewareSession);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const ficherosEstaticos = path.join(__dirname, "public");

app.use(express.static(ficherosEstaticos));
app.use(bodyParser.urlencoded({ extended: true }));

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia de DAOTasks
const daoU = new DAOUsers(pool);
const daoT = new DAOTasks(pool);


function comprobar(request,response, next){
    if(request.session.currentUser != null){
        response.locals.userEmail = request.session.currentUser;
        next();
    }
    else{
        response.redirect("/login");
    }
}
app.get("/", function(request, response) {
    response.redirect("/login");
});

app.get("/login",function(request, response){
    response.render("login",{errorMsg: null });
});

app.post("/login", function(request, response){
    daoU.isUserCorrect(request.body.email, request.body.password, function(err,result){
        if(err){
            callback(err);
        }
        else{
            if(result){
                request.session.currentUser = request.body.email;
                response.redirect("/tasks");
            }
            else{
                response.status(401);
                response.render("login",{errorMsg: "El email esta fatal" });
            } 
        }
    })
    
});

app.get("/tasks",comprobar,function(request,response){
    daoT.getAllTasks(response.locals.userEmail,function(err, result){
        if(err){
            console.log(err.message);
        }
        else {
            response.status(200);   
            response.render("tasks", { tasksList: result, email: response.locals.userEmail  });
            console.log("Exito en leer tareas");
        }
    });
});

app.post("/addTask",comprobar,function(request,response){
    let task = utils.createTask(request.body.text);
    daoT.insertTask(response.locals.userEmail,task,function(err,result){
        if(err){
            console.log("Error al insertar una tarea");
        }
        else{
            console.log("Tarea añadida con exito");
            response.status(200);
            response.redirect("/tasks");
        }   
    })
})

app.get("/logout",function(request,response){
    request.session.destroy();
    response.redirect("/login");
})

app.get("/finish/:id",comprobar,function(request,response){
    daoT.markTaskDone(request.params.id,function(err,result){
        if(err){
            console.log("Error al marcar como finalizada");
        }
        else{
            response.status(200);
            response.redirect("/tasks");
            console.log("Exito en finalizar tarea");
        }
    })
})

app.get("/deleteCompleted",comprobar,function(request,response){
    daoT.deleteCompleted(response.locals.userEmail,function(err){
        if(err){
            console.log("Error al borrar completadas");
        }
        else{
            response.status(200);
            response.redirect("/tasks");
            console.log("Exito al borrar las tareas");
        }
    })
})

app.get("/imagenUsuario",comprobar,function(request,response){
    daoU.getUserImageName(response.locals.userEmail,function(err,result){
        if(err){
            callback(err);
        }
        else{
            if(result[0].img == ""){
                response.sendFile(path.join(__dirname, "public", "img", "NoPerfil.jpg"));
            }
            else{
                response.sendFile(path.join(__dirname, "profile_imgs", result[0].img));
            }
        }
    })
})

app.listen(3000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});