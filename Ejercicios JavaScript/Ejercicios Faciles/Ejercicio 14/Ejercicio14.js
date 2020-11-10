"use strict"


let properties = ["nombre", "apellido1", "apellido2"];
let values = ["Roberto", "Torres", "Prensa"];

function createObjectWithValues(x,y){
    let newArray = {};
    for(let i = 0; i < x.length; i++){
        newArray[x[i]] = y[i];
        
}

return newArray;
}

console.log(createObjectWithValues(properties,values));