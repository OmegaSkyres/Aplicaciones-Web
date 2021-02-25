
const mysql = require("mysql");

class DAOUsuarios{
    constructor(pool) {
        this.pool = pool;
    }

    identificarUsuario(email, pass, callback){
        this.pool.getConnection(function(err, connection){
            if(err){
                callback(err, null);
            }
            else{
                const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
				connection.query(sql, [email, pass], function(error, result) {
					connection.release();
                    if(error){
                        callback(err, null);
                    }
                    else{
                        if(result.length == 0){
                            callback(new Error("Usuario no registrado"));
                        }
                        else
                            callback(null, result);
                    }
                });
            }
        });
    }

    crearUsuario(usuario, callback){
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"),null);
            }

            else{
                connection.query("INSERT INTO usuarios (username, email, password, imagen, reputacion) VALUES (?, ?, ?, ?, ?)",
                                [usuario.username, usuario.email, usuario.password, usuario.image,1], 
                                function(error, resultado1){
                    connection.release();
                    if(error){
                        callback(new Error("Error de acceso a la tabla Usuarios"));
                    }
                    else{
                        callback(null,resultado1);
                    }
                });
            }
        });
    }

    getUserImageName(email, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"),null);
            }
            else {
                connection.query("SELECT imagen FROM usuarios WHERE email = ?",[email],
                function(err, image){
                    connection.release(); // devolver al pool la conexión
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"),null);
                    }
                    else {
                        if (image.length > 0) {
                            callback(null, image);
                        }
                        else {
                            callback(null, false);
                        }
                    }
                });
            }
        }
        );

    }

    getUserProfileById(userId, callback) {
        this.pool.getConnection(function(error,connection){
            if(error){
                callback(error);
            }
            else{
                connection.query("SELECT * FROM usuarios LEFT JOIN medallas ON idUsuario = usuario WHERE idUsuario = ?",[userId], function (error, result) {
                    if(error){
                        callback(error);
                    }
                    else{
                        callback(null, result);
                    }
                });
            }
        });
    }

    getMedalsByUserId(userId, callback){
        let medals = [
            {bronces : []},
            {platas: []},
            {oros: []}
        ];
        this.pool.getConnection(function(error,connection){
            if(error){
                callback(error);
            }
            else{
                let oro = "oro";
                connection.query("SELECT *, (SELECT SUM(numero) FROM medallas m2 WHERE m2.color = ? AND usuario = ?) AS numoro FROM medallas m WHERE m.color = ? AND usuario = ?  ",[oro, userId, oro, userId], function (error, result) {
                    connection.release();
                    if(error){
                        callback(error);
                    }
                    else{
                        let plata = "plata";
                        connection.query("SELECT *, (SELECT SUM(numero) FROM medallas m2 WHERE m2.color = ? AND usuario = ?) AS numplata FROM medallas m WHERE m.color = ? AND usuario = ?  ",[plata, userId, plata, userId], function (error, result2) {
                            if(error){
                                callback(error);
                            }
                            else{
                                let bronce = "bronce";
                                connection.query("SELECT *, (SELECT SUM(numero) FROM medallas m2 WHERE m2.color = ? AND usuario = ?) AS numbronce FROM medallas m WHERE m.color = ? AND usuario = ?  " ,[bronce, userId, bronce, userId], function (error, result3) {
                                    if(error){
                                        callback(error);
                                    }
                                    else{
                                        medals[0].bronces.push(result3);
                                        medals[1].platas.push(result2);
                                        medals[2].oros.push(result);
                                        callback(null, medals);
                                    }
                                })
                            }
                        })
                    }
                });
            }
        });
    }


    increaseVisitProfile(userId,callback){
        this.pool.getConnection(function(error, connection){
            if(error){
                callback(new Error("Error de conexion a la base de datos"));
            }
            else{
                connection.query("UPDATE visitasusuario SET numvisitasU = numvisitasU + 1 WHERE id = ?", [userId], 
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

    leerTodos(callback){
        this.pool.getConnection(function(error, connection){
            if(error)
                callback(new Error("Error en la base de datos"));

            else{
                connection.query("SELECT username, reputacion, imagen, idUsuario, (SELECT pe.etiqueta FROM preguntaetiqueta pe2 JOIN preguntas p2 ON pe2.pregunta = p2.id JOIN usuarios u2 ON u2.idUsuario = p2.usuario GROUP BY etiqueta HAVING COUNT(*) >= ALL(SELECT COUNT(*) FROM preguntaetiqueta JOIN preguntas ON pregunta = id JOIN usuarios ON idUsuario = usuario GROUP BY etiqueta)) AS netiqueta FROM usuarios u LEFT JOIN preguntas p ON u.idUsuario = p.usuario LEFT JOIN preguntaetiqueta pe ON p.id = pe.pregunta GROUP BY username", function(error, resultado){
                    connection.release();
                    if(error)
                        callback(new Error("Error de acceso a la tabla Usuarios"));

                    else{
                        callback(null, resultado);
                    }
                })
            }

        })
    }

    filterUser(cadena,callback){
        this.pool.getConnection(function(error,connection){
            if(error){
                callback(error);
            }
            else{
                connection.query("SELECT username, reputacion, imagen, idUsuario, (SELECT pe.etiqueta FROM preguntaetiqueta pe2 JOIN preguntas p2 ON pe2.pregunta = p2.id JOIN usuarios u2 ON u2.idUsuario = p2.usuario GROUP BY etiqueta HAVING COUNT(*) >= ALL(SELECT COUNT(*) FROM preguntaetiqueta JOIN preguntas ON pregunta = id JOIN usuarios ON idUsuario = usuario GROUP BY etiqueta)) AS netiqueta FROM usuarios u LEFT JOIN preguntas p ON u.idUsuario = p.usuario LEFT JOIN preguntaetiqueta pe ON p.id = pe.pregunta WHERE username LIKE ? GROUP BY username ",["%" + cadena + "%"],function(error,result){
                    connection.release();
                    if(error){
                        callback(new Error("Fallo al obtener los usuarios"));
                    }
                    else{
                        callback(null,result);
                    }
                })
            }
        })
    }
}

module.exports = DAOUsuarios;