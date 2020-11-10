"use strict"

let o = {
    nombre: "Juan",
    apellido: "Perez",
    edad: "34"
}


function propiedades(x){
    let numPropiedades = Object.keys(x); 
    console.log("Numero de propiedades "+ numPropiedades.length);
    for(let i = 0; i < numPropiedades.length; i++){
        console.log(numPropiedades[i] + ": " + x[numPropiedades[i]]);

    }
}

propiedades(o);