"use strict";

const mysql = require("mysql");


class DAOTasks {
  constructor(pool) {  
    this.pool = pool;
  }

    getAllTasks(email, callback) {
        this.pool.getConnection(function(err, connection){
			if(err){
				callback(err, null);
			}else{
				const sql = "SELECT * FROM task LEFT JOIN tag ON taskId = id WHERE user = ? ";
				connection.query(sql, [email], function(err, resultado){
					connection.release();
					if(err){
						callback(err, null);
					}else{
                        let tasks = [];
						for (let item of resultado) {
							if (!tasks[item.id]){
								tasks[item.id] = {
									id: item.id,
									text: item.text,
									done: item.done,
									tags: []
								};
							}
							if (item.tag){
								tasks[item.id].tags.push(item.tag);
							}
						}
						callback(null, tasks);
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
                connection.query("INSERT INTO task (user, text, done) VALUES (?, ?, ?)",[email, task.text, 0], function(error, resultado1){
                    connection.release();
                    if(error){
                        callback(error);
                    }
                    else{
                        if (task.tags == null || task.tags.length == 0) {
							callback(null);
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
                        
                    }
                });   
            }
        });
    }


    deleteCompleted(email, callback) {
        var self = this; //Guardamos en una variable el contexto.
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                var sql = "SELECT id FROM task WHERE done = 1 AND user = ?;";
                connection.query(sql, email, function (err, rdo) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"), null);
                    } else if (rdo.length == 0) {
                        callback(null); //Solo debemos llamar al resto de métodos si y solo sí, hemos encontrado tareas, en caso contrario daría un error en las siguientes queries que esperan valores. 
                    } else {
                        let ids = rdo.map(value => value.id); //Tenemos que pasar solo los ids, pasando directamente rdo, estamos pasando un dictionary de tipo [id: valor];
                        self.deleteTags(ids, callback);
                    }
                });
            }
        });
    }

    deleteTags(ids, callback) {
        var self = this; //Guardamos en una variable el contexto.
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                if (ids != null) {
                    var sql = "DELETE FROM tag WHERE taskId IN ("
                    for (var i = 0; i < ids.length; i++) {
                        sql += "?,"
                    }
                    sql = sql.substr(0, sql.length - 1);
                    sql += ");"

                    connection.query(sql, ids, function (err) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"), null);
                        } else {
                            self.deleteTasks(ids, callback);
                        }
                    });
                }else{
                    callback(null);
                }
            }

        });
    }

    deleteTasks(ids, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                var sql = "DELETE FROM task WHERE id IN ("

                for (var i = 0; i < ids.length; i++) {
                    sql += "?,"
                }
                sql = sql.substr(0, sql.length - 1);
                sql += ");"

                connection.query(sql, ids, function (err, rdo) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"), null);
                    } else {
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