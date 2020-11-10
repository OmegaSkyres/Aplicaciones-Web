"use strict"

let properties = ["nombre", "apellido1", "apellido2"];

function createObject(x){
    let newArray = {};

    for(let i = 0; i < x.length; i++){
            newArray[x[i]] = "";
            
    }

    return newArray;
}

console.log(createObject(properties));