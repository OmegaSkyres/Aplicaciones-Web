    const http = require("http");
    const mysql = require("mysql");
    const pool = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "mibd"
    });
    function consultaBD(callback) {
        pool.getConnection(function(err, conexion) {
            if (err) { callback(err); }
            else {
                conexion.query(
                "SELECT Nombre, Apellidos, COUNT(corr.Correo) as NumCorreos " +
                "FROM Contactos con LEFT JOIN Correos corr ON con.Id = corr.Id " +
                "GROUP BY con.id",
                function(err, rows) {
                    conexion.release();
                    if (err) { callback(err); }
                    else {callback(null, rows);}
                });
            }
        });
    }

    const servidor = http.createServer(function(request, response) {
        consultaBD(function(err, filasBD) {
            if (err) {
                response.statusCode = 500; // Internal Server Error
                console.error(err);
            } else {
                response.statusCode = 200;
                devolverPagina(response, filasBD);
                }
            });
        });

        function devolverPagina(response, filasBD) {
            response.setHeader("Content-Type", "text/html");
            response.write('<html>');
            response.write('<head>');
            response.write('<title>Base de datos de teléfonos</title>');
            response.write('<meta charset="utf-8">');
            response.write('<style>th, td { border: 1px solid }</style>');
            response.write('</head>');
            response.write('<body>');
            response.write('<table>');
            response.write('<tr><th>Nombre</th><th>Apellidos</th>' +
            '<th>Número direcciones</th></tr>');
            filasBD.forEach(function(fila) {
            response.write('<tr>');
            response.write(`<td>${fila.Nombre}</td>`);
            response.write(`<td>${fila.Apellidos}</td>`);
            response.write(`<td>${fila.NumCorreos}</td>`);
            response.write('</tr>');
            });
            response.write('</table>');
            response.write('</body></html>');
            response.end();
            }

            servidor.listen(3000, function(err) {
                if(err) {
                    console.log("Error al iniciar el servidor");
                }
                else {
                    console.log("Servidor escuchando en el puerto 3000")
                }
                });
            }
                
                  
