"use strict";


let array1 = [2,3];
let array2 = [2,3];
let array3 = [2,3,4];
let roberto = false;
let gonzalo = 3;

function isArray(x){
    return x instanceof Array ;
}

function producto(x,y){
    if(typeof(x) == "number" && typeof(y)){
        return x*y;
    }
    else if(typeof(x) == "number" && isArray(y) || isArray(x) && typeof(y) == "number"){
        let vector ={}
        if(typeof(x) == "number" && isArray(y)){
            for(let i = 0; i < y.length; i++){
                vector[i] = y[i] * x;
            }
        }
        else{
            for(let i = 0; i < x.length; i++){
                vector[i] = x[i] * y;
            }
        }
        return vector;
    }
    else if(isArray(x) && isArray(y) && x.length == y.length){
        let vector ={}
        for(let i = 0; i < x.length; i++){
            vector[i] = x[i] * y[i];
        }
        return vector;
    }
    else if(isArray(x) && isArray(y) && x.length != y.length){
        throw new TypeError("Los vectores tienen longitud diferente");
    }
    else{
        throw new TypeError("Inconsistencia en los parámetros de la función");
    }
}

console.log(producto(2,3))
console.log(producto(array1,array2));

try{
    console.log(producto(array1,array3));
}catch(e){
    console.log(e.message);
}

try{
    console.log(producto(roberto,gonzalo));
}catch(e){
    console.log(e.message);
}


