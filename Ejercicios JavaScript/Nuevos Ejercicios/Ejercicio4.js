"use strict"

let personas = [
    {nombre: "Ricardo", edad: 63},
    {nombre: "Paco", edad: 55},
    {nombre: "Enrique", edad: 32},
    {nombre: "Adrián", edad: 34},
    {apellido: "García", edad: 28}
    ];
    

function pluck(objects, fieldName){
    return objects.filter(element => element[fieldName]).map(element => element[fieldName]);
}

console.log(pluck(personas, "nombre"));


function partition(array, p){
    let verdaderos = array.filter(n => p(n) == true);
    let falsos = array.filter(n => p(n) != true);
    let res = [verdaderos, falsos];
    return res;
}
console.log(partition(personas, pers => pers.edad >= 60));