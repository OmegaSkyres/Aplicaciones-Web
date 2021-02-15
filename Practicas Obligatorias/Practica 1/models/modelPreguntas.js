const mysql = require("mysql");

class DAOPreguntas {
    constructor(pool) {
        this.pool = pool;
    }

    getAllQuestions(callback){
        this.pool.getConnection(function(error, connection){
            if(error){
                callback(error);
            }
            else{
                connection.query("SELECT *, (SELECT COUNT(*) FROM preguntaetiqueta WHERE pregunta = p.id) AS numEtiquetas FROM preguntas p JOIN usuarios u ON p.usuario = u.idUsuario LEFT JOIN preguntaetiqueta pe ON p.id = pe.pregunta ORDER BY fecha DESC", function(error, result){

                    connection.release();
                    if(error){
                        callback(new Error("No hay preguntas"));
                    }
                    else{
                        result.forEach(element => {
                            if(element.cuerpo.length > 150){
                                element.cuerpo = element.cuerpo.substr(0, 150); //Limitamos el cuerpo a 150 caracteres
                                element.cuerpo += "...";
                            }
                        });
                        callback(null, result);
                    }
                });
            }
        })
    }

    createQuestion(pregunta, callback){
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"),null);
            }

            else{
                connection.query("INSERT INTO preguntas (titulo, cuerpo, usuario) VALUES (?, ?, ?)",
                                [pregunta.titulo, pregunta.cuerpo, pregunta.usuario],
                                function(error, resultado1){
                    connection.release();
                    if(error){
                        callback(error);
                    }

                    else{
                        let query1 = "INSERT IGNORE INTO etiquetas (nombre) VALUES"
                        var query2 = "INSERT INTO preguntaetiqueta (pregunta, etiqueta) VALUES";
                        let ids = [];

                        for(var i = 0; i < pregunta.etiquetas.length; i++){
                            query1 += "(?),"
                            query2 += "(?,?),";

                            ids.push(resultado1.insertId);
                            ids.push(pregunta.etiquetas[i]);
                        }

                        query1 = query1.substr(0, query1.length-1);
                        query1 += ";";
                        query2 = query2.substr(0, query2.length-1);
                        query2 += ";";

                        connection.query(query1, pregunta.etiquetas, function(error, resultado2){
                            if(error){
                                callback(new Error("Error de acceso a la base de datos"));
                            }
                            else{
                                connection.query(query2,ids, function(error, resultado3){
                                    if(error){
                                        callback(new Error("Error de acceso a la base de datos"));
                                    }
                                    else{
                                        callback(null, resultado3);
                                    }
                                })
                            }
                        });
                    }
                });
            }
        });
    }


    getUnansweredQuestions(callback){
        this.pool.getConnection(function(error, connection){
            if(error){
                callback(error);
            }
            else{
                connection.query("SELECT *, (SELECT COUNT(*) FROM preguntaetiqueta WHERE pregunta = p.id) AS numEtiquetas FROM preguntas p LEFT JOIN respuestas r ON r.pregunta = p.id JOIN usuarios u ON p.usuario = u.idUsuario JOIN preguntaetiqueta pe ON p.id = pe.pregunta WHERE p.id NOT IN(SELECT pregunta FROM respuestas)  ORDER BY p.fecha DESC", function(error, result){
                    connection.release();
                    if(error){
                        callback(new Error("No hay preguntas"));
                    }
                    else{
                        result.forEach(element => {
                            element.cuerpo = element.cuerpo.substr(0, 150); //Limitamos el cuerpo a 150 caracteres
                            element.cuerpo += "...";
                        });
                        callback(null, result);
                    }
                });
            }
        })
    }


    getTagsByQuestion(preguntaId, callback){
        this.pool.getConnection(function(error, connection){
            if(error){
                callback(error);
            }
            else{
                connection.query("SELECT * FROM preguntaetiqueta WHERE pregunta = ? ") , [preguntaId],
                function(error, resultado){
                    connection.release();
                    if(error){
                        callback(new Error("Error de acceso a la tabla Pregunta-Etiqueta"));
                    }
                    else callback(null,resultado);
                }
            }

        });
    }

    getQuestionsByTag(tag, callback){
        this.pool.getConnection(function(error, connection){
            if(error){
                callback(error);
            }
            else{
                connection.query("SELECT * FROM preguntaetiqueta WHERE etiqueta = ? " , [tag],
                function(error, resultado){
                    connection.release();
                    if(error){
                        callback(new Error("Error de acceso a la tabla Pregunta-Etiqueta"));
                    }
                    else{
                        var consulta = "SELECT *, (SELECT COUNT(*) FROM preguntaetiqueta WHERE pregunta = p.id) AS numEtiquetas FROM preguntas p JOIN preguntaetiqueta pe ON p.id = pe.pregunta JOIN usuarios u ON p.usuario = u.idUsuario WHERE p.id = ? ";
                        let ids = [];
                        ids.push(resultado[0].pregunta);
                        for(var i = 1; i < resultado.length; i++){
                            consulta += "OR id = ? ";
                            ids.push(resultado[i].pregunta);
                        }

                        consulta += "ORDER BY fecha DESC;"
                        connection.query(consulta, ids, function(error,resultado2){
                            if(error){
                                callback(new Error("Error de acceso a la tabla Preguntas"));
                            }
                            else{
                                resultado2.forEach(element => {
                                    element.cuerpo = element.cuerpo.substr(0, 150); //Limitamos el cuerpo a 150 caracteres
                                    element.cuerpo += "...";
                                });
                                callback(null, resultado2);
                            }
                        });
                    }
                });
            }

        });
    }

    filterQuestion(cadena, callback){
        this.pool.getConnection(function(error, connection){
            if(error){
                callback(new Error("Error en la base de datos"));
            }
            else{
                connection.query("SELECT *, (SELECT COUNT(*) FROM preguntaetiqueta WHERE pregunta = p.id) AS numEtiquetas FROM preguntas p JOIN usuarios u ON p.usuario = u.idUsuario LEFT JOIN preguntaetiqueta pe ON p.id = pe.pregunta WHERE titulo LIKE ? OR cuerpo LIKE ? ORDER BY fecha DESC", ["%" + cadena + "%","%" + cadena + "%"], function(error, result){
                    connection.release();
                    if(error)
                        callback(new Error("Error de acceso a la tabla Usuarios"));
                    else{
                        result.forEach(element => {
                            element.cuerpo = element.cuerpo.substr(0, 150); //Limitamos el cuerpo a 150 caracteres
                            element.cuerpo += "...";
                        });
                        callback(null, result);
                    }
                })
            }
        })
    }


    positiveVoteQuestionById(questionId, userId, callback){
        this.pool.getConnection(function(error,connection){
            if(error){
                callback(error);
            }
            else{
                connection.query("INSERT IGNORE INTO votopregunta (voto, usuario, pregunta) VALUES (?,?,?)" , [1,userId,questionId], function(error, result){
                    connection.release();
                    if(error){
                        callback(error);
                    }
                    else{
                        callback(null,result);
                    }
                });
            }
        })
    }

    negativeVoteQuestionById(questionId, userId, callback){
        this.pool.getConnection(function(error,connection){
            if(error){
                callback(error);
            }
            else{
                connection.query("INSERT IGNORE INTO votopregunta (voto, usuario, pregunta) VALUES (?,?,?)" , [0,userId,questionId], function(error, result){
                    connection.release();
                    if(error){
                        callback(error);
                    }
                    else{
                        callback(null,result);
                    }
                });
            }
        })
    }

    getDetailedQuestion(questionId, callback){
        this.pool.getConnection(function(error, connection){
            if(error){
                callback(new Error("Error de conexion a la base de datos"));
            }
            else{
                connection.query("SELECT *, (SELECT COUNT(*) FROM visitaspregunta WHERE idPregunta = ?) AS numvisits, (SELECT COUNT(*) FROM votopregunta WHERE pregunta = ?) AS numvotes, (SELECT COUNT(*) FROM preguntaetiqueta WHERE pregunta = p.id) AS numEtiquetas FROM preguntas p JOIN usuarios usu ON p.usuario = usu.idUsuario LEFT JOIN preguntaetiqueta pe ON p.id = pe.pregunta WHERE p.id = ?", [questionId, questionId, questionId],
                function(error, resultado){
                    connection.release();

                    //Estas dos consultas encadenadas se van a quitar mas pronto que tarde

                    if(error){
                        callback(new Error("Error de acceso a la tabla Preguntas"));
                    }
                    else{
                        callback(null, resultado);
                    }
                })
            }
        })
    }

    increaseVisit(questionId, userId, callback){
        this.pool.getConnection(function(error, connection){
            if(error){
                callback(new Error("Error de conexion a la base de datos"));
            }
            else{
                connection.query("INSERT IGNORE INTO visitaspregunta (idPregunta, usuario) VALUES (?,?)", [questionId, userId],
                function(error, resultado){
                    connection.release();
                    if(error){
                        callback(new Error("Error de acceso a la tabla Visitaspregunta"));
                    }
                    else callback(null, resultado);
                })
            }
        })
    }

}

module.exports = DAOPreguntas;