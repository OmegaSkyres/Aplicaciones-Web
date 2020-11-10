"use strict"

let array = [incrementar, duplicar, cuadrado, factorial];



function isUndefined(x){
    return x instanceof undefined;
}

function incrementar(x) {
    return x + 1;
}
function duplicar(x) {
    return 2 * x;
}
function cuadrado(y) {
    return y * y;
}
function factorial(n) {
    if (n <= 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

function sequence1(vector, x){
    
    let res = vector[0](x);
    for(let i = 1; i < vector.length; i++){
        res = vector[i](res);
    }
    console.log(res);

}

//sequence1(array,1)

function sequence2(vector, x) {
    let res = vector[0](x);
    if(isUndefined(res)){
        return undefined;
    }
    for(let i = 1; i < vector.length; i++){
        res = vector[i](res);
        if(isUndefined(res)){
            break; 
        }

    }
    return res;

}

sequence2(array,1);

function sequence1_b(funs, x) {

    if (isFunctionsArray(funs)) {

        let temp = x;

        for (let i = 0; i < funs.length; i++) {

            temp = funs[i](temp);
        }
        return temp;
    } else
        throw new TypeError("El primer parámetro no es un array de funciones");

}


function isFunctionsArray(funs) {
    if (!(funs instanceof Array))
        return false;

    let f = true;
    let i = 0
    while (funs[i] && i < funs.length) {
        if (!(f instanceof Function))
        // if (typeof(funs[i]) !== "function")
            f = false;
        i++;
    }
    return f;
}

var prueba = sequence1_b(5, 1);
console.log(prueba);