$(function () {
    let tags =[];
	//Show task's text
    $('#search').on('keyup', function () {
		let valor = $(event.target).prop('value').trim();
		$('#vistaPrevia').text(valor);
	});
	// Add tag
	$('#button').on("click", function (){
		let valor = $('#tags').prop('value').trim();
		if(valor == ""){
			alert("El tag no puede ser vacio");
			return;
		}
		if(tags.includes('@' + valor)) {
			alert("El tag no puede estar repetido");
			return;
		}
		let tag = $('<span id="newtag' + tags.length + '" class="previewtag">' + valor + '</span>');
		$('#vistaPrevia').append(tag); //append y el elemento
		tags.push('@' + valor);
	})
	$('#vistaPrevia').on("click", "span", function(){ //Pulsar en un span de vistaPrevia
		tags.splice($(this).attr('id'), 1);
		let tag = $(this).attr('id');
		$(this).remove(); //Remove no lleva parametro
	})



});