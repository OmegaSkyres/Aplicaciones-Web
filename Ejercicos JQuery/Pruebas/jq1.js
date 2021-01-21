"use strict";

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

// $(function() {
//     $("#añadirElemento").on("click", function() {
//     let nuevoElemento = $("<li>Nuevo elemento</li>");

//     });
// });

// $("#elem").on("mousedown", function(event) {
//     console.log(`Posición: ${event.pageX}, ${event.pageY}`);
//     console.log(`Botón pulsado: ${event.which}`);
// });

// const IZQUIERDA = 37;
// const DERECHA = 39;
// const ARRIBA = 38;
// const ABAJO = 40;
// $(function() {
//     let parrafo = $("div.parrafo-movil");
//     $("body") .on("keydown", function(event) {
//         let incremento = { x: 0, y: 0 };
//         switch (event.which) {
//             case IZQUIERDA: incremento.x = -3; break;
//             case DERECHA: incremento.x = 3; break;
//             case ARRIBA: incremento.y = -3; break;
//             case ABAJO: incremento.y = 3; break;
//         // ...
//         }
//         let current = parrafo.offset();
//         parrafo.offset({
//             left: current.left + incremento.x,
//             top: current.top + incremento.y
//         });
//         event.preventDefault();
//     });
// });

// $(function() {
//     $("#superficie").on("mouseenter", function() {
//       $("#posicion").show();
//     });
//     $("#superficie").on("mouseleave", function() {
//       $("#posicion").hide();
//     });
//     $("#superficie").on("mousemove", function(event) {
//       $("#posicion").text(
//         `${event.pageX} x ${event.pageY}`
//       );
//     });
//   });

// $(function () {
//   $(document).on("keydown", function (event) {
//     $(".indicador").removeClass("activo");
//     $("#codigoTecla").text(event.which);
//     if (event.ctrlKey) {
//       $("#ctrl").addClass("activo");
//     }
//     if (event.metaKey) {
//       $("#meta").addClass("activo");
//     }
//     if (event.altKey) {
//       $("#alt").addClass("activo");
//     }
//     if (event.shiftKey) {
//       $("#shift").addClass("activo");
//     }
//     event.preventDefault();
//   });
// });
$(function(){
    // $("#listaElementos").on("click", "li", function (event) {
    //     // event.target contiene un elemento del DOM
    //     // Construir una selección a partir de él:
    //     let elementoPulsado = $(event.target);
    //     // Mostrar mensaje con el contenido del <li>:
    //     alert("Has hecho clic en " + elementoPulsado.text());
    //   });
    //   let contador = 3;
    //   $("#añadir").on("click", function () {
    //     contador++;
    //     let newElem = $(`<li>Elemento ${contador}</li>`);
    //     $("#listaElementos").append(newElem);
    //   });
    // $("body").on("click", function() {
    //     console.log("Se ha pulsado en el cuerpo de la página");
    //     });
    //     $("#contenedor").on("click", function() {
    //     console.log("Se ha pulsado en la región externa");
    //     });
    //     $("#region1").on("click", function() {
    //     console.log("Se ha pulsado en la región 1");
    //     event.stopPropagation();
    //     });
    //     $("#region2").on("click", function() {
    //     console.log("Se ha pulsado en la región 2");
    //     });

// Superficie inicialmente oculta
// Mostrar y ocultar completamente
// $("#superficie").fadeIn(2000).fadeOut(2000);
// // Mostrar y ocultar hasta el 50% de opaciodad
// $("#superficie").fadeIn(2000).fadeTo(2000, 0.5);
// // Ocultar y mostrar con deslizamiento
// $("#superficie").slideUp(2000).slideDown(2000);

$("#superficie").show().css("position", "relative")
.animate({ top: "400px", opacity: "0" }, 2000);

})

