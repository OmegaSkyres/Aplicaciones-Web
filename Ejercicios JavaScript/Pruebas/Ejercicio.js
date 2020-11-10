"use strict";

// let vector = ["Hola","Roberto","Torres"];

// function mapLenghts(array){
//     let result = [];
//     for(let element of array){
//         result.push(element.length);
//     }

//     return result;
// }

// console.log(mapLenghts(vector));

// let numeros = [3,2,5,7,9,1]

// function filterSup(array,x){
//     let result = [];
//     if(Array.isArray(array)){
//         for(let element of array){
//             if(element > x){
//                 result.push(element);
//             }
//         }
//     }
//     return result;
// }

// console.log(filterSup(numeros,4));

// let numeros = [3,2,5,7,9,1]

// function filterSup2(array,x){
//     return array.filter(element => element > x);
// }

// console.log(filterSup2(numeros,4));

// let numeros = [filterSup, filterSup2];

// function everyFunction2(array){
//     return array.every(element => element instanceof Function);
// }

// console.log(everyFunction2(numeros));

// function someUndefined2(array){
//     return array.some(element => typeof(element) ==  "undefined");
// }

// console.log(someUndefined2(numeros));

let numeros =[2,3];
function reduceSquare2(array){
   return array.reduce((ac, n) => ac + n*n,0); 
}

console.log(reduceSquare2(numeros));