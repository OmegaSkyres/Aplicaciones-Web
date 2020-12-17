"use strict"

// let listaTareas = [
//     { text: "Preparar práctica AW", tags: ["AW", "practica"] },
//     { text: "Mirar fechas congreso", done: false, tags: [] },
//     { text: "tareaNoFinalizada2", done: true, tags: ["AW"] },
//     { text: "tareaNoFinalizada3", done: true, tags: [] },
//     { text: "Ir al supermercado", tags: ["personal","AW"] },
//     { text: "Tarea1", done: false, tags: ["personal"] },
//     { text: "Tarea2", tags: ["personal"] },
//     { text: "Tarea3", done: false, tags: ["personal"] },
//     ];
    
function getToDoTask(tasks){
    if(Array.isArray(tasks) && Array.isArray(tags)){
        return tasks.filter(task => task.done == false || task.done == null).map(task => task.text);
    }
}

//console.log(getToDoTask(listaTareas));

function findByTag(tasks, tag){
    if(Array.isArray(tasks)){
        return tasks.filter(task => task.tags.indexOf(tag) != -1);
    }
}
// // console.log(findByTag(listaTareas, "personal"));

function findByTags(tasks, tags){
    if(Array.isArray(tasks) && Array.isArray(tags)){
        return tasks.filter(task => task.tags.some(n => tags.some(m => n == m) == true));
    }
}
// //console.log(findByTags(listaTareas, ["personal", "hdhf", "89745yrtr934"]));

function countDone(tasks){
    //return tasks.reduce((acumulado, task) => acumulado + Number(task.done == true) , 0);
    if(Array.isArray(tasks)){
        return tasks.filter(task => task.done == true).length; //Tambien se puede con .map(task => task.length)
    }
}

//console.log(countDone(listaTareas));


function createTask(texto){
    let tags = texto.match(/@\w*/g);
    if (tags != undefined && tags.length != 0) {
        tags = tags.map(e => e.substring(1));
    }
    let text = texto.replace(/@\w*/g, "").trim();

    return { text: text, tags: tags };
}

//console.log(createTask("@AW @practica Preparar práctica AW"));

module.exports = {
    getToDoTask,
    findByTag,
    findByTags,
    countDone,
    createTask,
}