"use strict";

// // let vector = ["Hola","Roberto","Torres"];

// function mapLenghts(array){
//     let result = [];
//     for(let element of array){
//         result.push(element.length);
//     }

//     return result;
// }

// // console.log(mapLenghts(vector));

// // let numeros = [3,2,5,7,9,1]

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

// let a = filterSup;
// let b = mapLenghts;
// // console.log(filterSup(numeros,4));

// let funtions = [a,b];

// function everyFunction(array){
//     for(let element of array){
//         if(element instanceof Function){
//             return false;
//         }
//     }
//     return true;
// }
// // if(everyFunction(funtions)) console.log("SI");
// // else console.log("No");
// console.log(everyFunction(funtions))

// let a = 2;
// let b = "hola";
// let c = undefined;
// let arrayUndefined = [a,b];

// function someUndefined(array) {
//     if(array instanceof Array){
//         for(let und of array){
//             if(und === undefined) return true;
//         }
//     }
//     else return false;
// }

// console.log(someUndefined(arrayUndefined));

// let arrayNumeros = [2,3,4];

// function reduceSquare(array){
//     let sol = 0;
//     if(Array.isArray(array)){
//         for(let element of array){
//             sol += (element * element)
//         }
//     }
//     return sol;
// }

// console.log(reduceSquare(arrayNumeros));

let vector = ["Hola","Roberto","Torres"];

function mapLengths2(array) {
    return array.map(element => element.length);
}

console.log(mapLengths2(vector));