"use strict"

let m = [
    [ "Esto", "es" , "una fila" ],
    [ "aquí", "va" , "otra fila" ],
    [ "y" , "aquí", "otra más" ]
];
    
function insertMatrix(selector, matriz){
    var nuevo = "<table>";
    for(let i = 0; i < matriz.length; i++){
        nuevo += "<tr>";
        for(let j = 0; j < matriz[i].length; j++){
            nuevo += "<td>";
            nuevo += matriz[i][j];
            nuevo += "</td>"
        }
        nuevo += "</tr>";   
        $(selector).append(nuevo);
    }
    nuevo += "</table>"
}

$(function(){
    insertMatrix("div",m);
});