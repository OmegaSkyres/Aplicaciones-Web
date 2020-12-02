user"use strict";

const mysql = require("mysql");


class DAOTasks {
  constructor(pool) {  
    this.pool = pool;
  }

    getAllTasks(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM task JOIN tag ON taskid = id WHERE user = ?",[email], 
                    function (err, resultado) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            if (resultado.length === 0) {
                                callback(err, false); 
                            }
                            else {
                                let list = [];
                                var aux = {
                                    id: resultado[0].id,
                                    text: resultado[0].text,
                                    done: resultado[0].done,
                                    tags: []
                                };
                                resultado.forEach(element => {
                                    if(element.id == aux.id){
                                        aux.tags.push(element.tag);
                                    }
                                    else{
                                        list.push(aux);
                                        aux = {
                                            id: element.id,
                                            text: element.text,
                                            done: element.done,
                                            tags: []
                                        };
                                        aux.tags.push(element.tag);
                                    }
                                });

                                list.push(aux);
                                callback(null, list);
                            }
                        }
                });
            }
        });
    }

    insertTask(email, task, callback){
        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"),null);
            }

            else{
                connection.query("INSERT INTO task (user, text, done) VALUES (?, ?, ?)",[email, task.text, task.done], function(error, resultado1){
                    connection.release();
                    if(error){
                        callback(error);
                    }
                    else{
                        let taglist = [];
                        task.tags.forEach(e => {taglist.push([resultado1.insertId, e])});
                        
                        connection.query("INSERT INTO tag (taskid, tag) VALUES ?", [taglist], function(error, resultado2){
                            if(error){
                                callback(new Error("Error de acceso a la base de datos"));
                            }
                            else{
                                callback(null);
                            }
                        })
                    }
                });   
            }
        });
    }


    deleteCompleted(email, callback){
        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"),null);
            }

            else{
                connection.query("DELETE FROM task WHERE user = ? AND done = 1",[email], function(error){
                    connection.release();
                    if(error){
                        callback(new Error("Error de acceso a la base de datos"));
                    }

                    else{
                        callback(null);
                    }
                });
            }
        });
    }

    markTaskDone(idTask, callback){
        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"),null);
            }

            else{
                connection.query("UPDATE task SET done = 1 WHERE id = ?; ",[idTask], function(error){
                    connection.release();
                    if(error){
                        callback(new Error("Error de acceso a la base de datos"));
                    }

                    else{
                        callback(null);
                    }
                });
            }
        });
    }
}

module.exports = DAOTasks;