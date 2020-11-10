"use strict"
let frase = "Hola me llamo Roberto";
let cont = 0

for(let i = 0; i < frase.length; ++i) {
	if (frase[i] == "a") cont++;
}

console.log(cont)

console.log("La frase tiene " + cont + " a" );