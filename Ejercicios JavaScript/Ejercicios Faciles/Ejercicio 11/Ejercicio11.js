"use strict"

let a = 4;
let b = true;
let c = "cadena";
var d;
let e = null;
let f = NaN;
let g = function fun(){};
let h = [1,2,3];
let i = {x:1,y:2};


function primtiveOrObject(x){
    let cadena = null;
    if (typeof(x) != "object"){
        cadena = "primitive - " + typeof(x);
    }
    else cadena = `Object`;
    return cadena;
}


console.log(primtiveOrObject(a));
console.log(primtiveOrObject(b));
console.log(primtiveOrObject(c));
console.log(primtiveOrObject(d));
console.log(primtiveOrObject(e));
console.log(primtiveOrObject(f));
console.log(primtiveOrObject(g));
console.log(primtiveOrObject(h));
console.log(primtiveOrObject(i));
