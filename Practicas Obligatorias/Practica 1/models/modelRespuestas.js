const mysql = require("mysql");

class DAORespuestas{
    constructor(pool){
        this.pool = pool;
    }


    crearRespuesta(respuesta, callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(err);
            }
            else{
                connection.query("INSERT INTO respuestas (pregunta, cuerpoR, usuarioR) VALUES (?, ?, ?)", [respuesta.question, respuesta.cuerpo, respuesta.user],function(err, result){
                    connection.release();
                    if(err){
                        callback(err);
                    }
                    else{
                        callback(null,result);
                    }
                });
            }
        });
    }

    positiveVoteReplyById(replyId, userId,  callback){
        this.pool.getConnection(function(error,connection){
            if(error){
                callback(error);
            }
            else{
                connection.query("INSERT IGNORE INTO votorespuesta (voto, usuario, respuesta) VALUES (?,?,?)" , [1,userId,replyId], function(error, result){
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

    negativeVoteReplyById(replyId, callback){
        this.pool.getConnection(function(error,connection){
            if(error){
                callback(error);
            }
            else{
                connection.query("INSERT IGNORE INTO votorespuesta (voto, usuario, respuesta) VALUES (?,?,?)" , [0,userId,answerId], function(error, result){
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

    getReplysByIdQuestion(questionId, callback){
        this.pool.getConnection(function(error,connection){
            if(error){
                callback(error);
            }
            else{
                connection.query("SELECT * FROM respuestas r JOIN usuarios usu ON r.usuarioR = usu.idUsuario LEFT JOIN votorespuesta vr ON vr.respuesta = r.idR WHERE pregunta = ? ORDER BY fechaR DESC"  , [questionId], function(error, result){
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

}

module.exports = DAORespuestas;
