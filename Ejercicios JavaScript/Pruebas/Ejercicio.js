"use strict";

var x = 10;
console.log(typeof(x)); // number
x = 1.23;
console.log(typeof(x)); // number

x = true;
console.log(typeof(x)); // boolean
x = false;
console.log(typeof(x)); // boolean
console.log(typeof(3 < 4)); // boolean

x = "cadena";
console.log(typeof(x)); // string
let z;
console.log(typeof(z)); // undefined

let numero = 25
let cadena = "25"

if(cadena === numero) console.log("Si");
else console.log("No");
