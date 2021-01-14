"use strict"

// $(function() {

    // let $h1 = $("h1");
    // let $p = $("p");

    // console.log($h1);
    // console.log($p);


    // let $h = $("p").children();
    // console.log($h)
    // console.log($h.lenght);

    // let $h = $("p").children("a");
    // console.log($h)
    // console.log($h.lenght);

    // });

    // $("p").on("mouseenter", function(){
    //     alert("Raton dentro del parrafo");
    // })

//     let candadoAbierto = true;
// function cambiarCandado() {
//     candadoAbierto = !candadoAbierto;
//     if (candadoAbierto) {
//         $("#candado").prop("src",  "candadoAbierto.png");
//     } else {
//         $("#candado").prop("src", "candadoCerrado.png");
//     }
// }
// $(function() {
//     $("#botonAbrirCerrar").on("click", cambiarCandado);
// });

// $("#cambioClase").on("click", function() {

//     $("h4").prop("class", "clase-prop");

//   });

// });

// function mostrarInfo() {
//     let edad = $("#campoEdad").prop("value");
//     let fumador = $("#campoFumador").prop("checked");
//     alert(`Tienes ${edad} años y ` +
//         `${fumador ? '' : 'no'} eres fumador`);
// }

// $(function() {
//     let cabecera = $("h1");
//     cabecera.on("click", function() {
//         cabecera.toggleClass("rojo");
//     });
// });


// function abrirVentana() {
//         $("#ventana").show();
// }
// function cerrarVentana() {
//     $("#ventana").hide();
// }
// $(function() {
//     $("#mostrarVentana").on("click", abrirVentana);
//     $("#ventana span.cerrar").on("click", cerrarVentana);
//     $("#cerrar").on("click", cerrarVentana);
// });


// $("#campoNumero").on("change", function() {
//     // Obtenemos valor actual
//     let valor = $(this).text();
//     // let valor = $(this).prop("value").trim();
//     if (valor === "") {
//     $("#mensaje").text("El campo está vacío");
//     } else if (isNaN(Number(valor))) {
//     $("#mensaje").text("No se ha introducido un número");
//     } else {
//     $("#mensaje").text("");
//     }
// });


// $("#incrementar").on("click", function() {
//     let elemento = $("#elem");
//     let num = elemento.data("number");
//     elemento.data("number", num + 1);
// });
//     // Al pulsar el botón Obtener, se muestra el valor actual de la
//     // propiedad 'number' del párrafo
// $("#obtener").on("click", function() {
//     alert($("#elem").data("number"));
// });
    

$(function() {
    $("#añadirElemento").on("click", function() {
    let nuevoElemento = $("<li>Nuevo elemento</li>");
    $("#listaNumerada").append(nuevoElemento);
});
});
    
    
    