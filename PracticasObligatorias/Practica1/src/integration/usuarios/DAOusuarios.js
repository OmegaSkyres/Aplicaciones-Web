
const mysql = require("mysql");

class DAOTasks {
    constructor(pool) {
        this.pool = pool;
    }
    
    crearUsuario(usuario, callback){
        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"),null);
            }

            else{
                connection.query("INSERT INTO Usuarios (username, email, password, fecha, reputacion, npreguntas, nrespuestas, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                                [usuario.username, usuario.email, usuario.password, usuario.fecha, usuario.reputacion, usuario.npreguntas, usuario.nrespuestas, usuario.imagen], 
                                function(error, resultado1){
                    connection.release();
                    if(error){
                        callback(new Error("Error de acceso a la tabla Usuarios"));
                    }   
                    else{
                        callback(resultado);
                    }
                });   
            }
        });
    }

    leerPorEmail(email, callback){
        this.pool.getConnection(function(error, connection){
            if(error)
                callback(new Error("Error en la base de datos"));

            else{
                connection.query("SELECT * FROM Usuarios WHERE email = ?", [email], function(error, resultado){
                    connection.release();
                    if(error)
                        callback(new Error("Error de acceso a la tabla Usuarios"));
                    
                    else{
                        callback(resultado);
                    }
                })
            }
                
        })
    }

    leerPorUsername(username, callback){
        this.pool.getConnection(function(error, connection){
            if(error)
                callback(new Error("Error en la base de datos"));

            else{
                connection.query("SELECT * FROM Usuarios WHERE username = ?", [username], function(error, resultado){
                    connection.release();
                    if(error)
                        callback(new Error("Error de acceso a la tabla Usuarios"));
                    
                    else{
                        callback(resultado);
                    }
                })
            }
                
        })
    }
    
    modificarUsuario(usuario, callback){
        this.pool.getConnection(function(error, connection){
            if(error)
                callback(new Error("Error en la base de datos"));
            else{
                connection.query("UPDATE Usuario SET")
                connection.release();
            }
        })
    }

   
    leerTodos(callback){
        this.pool.getConnection(function(error, connection){
            if(error)
                callback(new Error("Error en la base de datos"));

            else{
                connection.query("SELECT username, reputacion FROM Usuarios", [], function(error, resultado){
                    connection.release();
                    if(error)
                        callback(new Error("Error de acceso a la tabla Usuarios"));
                    
                    else{//TODO Consulta loquisima
                        connection.query("SELECT etiqueta FROM Usuarios JOIN Preguntas ON usermame = usuario JOIN PreguntaEtiqueta ON id = pregunta HAVING ")
                        callback(resultado);
                    }
                })
            }
                
        })
    }

    leerMedallasPorUsuario(usarname, callback){
        this.pool.getConnection(function(error, connection){
            if(error)
                callback(new Error("Error en la base de datos"));

            else{
                connection.query("SELECT * FROM Medallas WHERE username = ? ", [username], function(error, resultado){
                    connection.release();
                    if(error)
                        callback(new Error("Error de acceso a la tabla Medallas"));
                    
                    else{
                        
                        callback(resultado);
                    }
                })
            }
                
        })
    }

    preguntasUsuario(username, callback){
        this.pool.getConnection(function(error, connection){
            if(error)
                callback(new Error("Error en la base de datos"));
            
            else{
                connection.query("SELECT * FROM Preguntas WHERE usuario = ?", [username], function(error, resultado){
                    connection.release();
                    if(error)
                        callback(new Error("Error de acceso a la tabla Preguntas"));
                        
                    else
                        callback(resultado);
                    
                })
            }
        })
    }

    respuestasUsuario(email, callback){
        this.pool.getConnection(function(error, connection){
            if(error)
                callback(new Error("Error en la base de datos"));
            
            else{
                connection.query("SELECT * FROM Respuestas WHERE usuario = ?", [username], function(error, resultado){
                    connection.release();
                    if(error)
                        callback(new Error("Error de acceso a la tabla Preguntas"));
                        
                    else
                        callback(resultado);
                    
                })
            }
        })
    }


    filtroUsuario(cadena, callback){ //Funcion usada para la busqueda de los usuarios
        this.pool.getConnection(function(error, connection){
            if(error){
                callback(new Error("Error en la base de datos")); 
            }
            else{
                connection.query("SELECT username, reputacion FROM Usuarios WHERE username LIKE '%?%' ", [cadena], function(error, resultado){
                    connection.relase();
                    if(error)
                        callback(new Error("Error de acceso a la tabla Usuarios"));
                    else
                        callback(resultado);
                })
            }
        })
    }
}

module.exports = DAOUsuarios;