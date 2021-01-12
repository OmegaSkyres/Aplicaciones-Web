"use strict"

//alert("mensaje en ventana")



function saludar() {
    console.log("Hola !" + new Date().toISOString());
  }

// setTimeout(saludar, 1000);

// Saludamos cada 1000 milisegundos
let timerID = setInterval(saludar, 1000);
// Ponemos otro temporizador que, transcurridos 5000 ms,
// cancele el temporizador anterior:
setTimeout(function() { clearInterval(timerID); }, 5000);