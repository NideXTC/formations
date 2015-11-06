// Exercice 1

$('.alert').click(function(){
	alert('Coucou');
});

// Exercice 2 
$('#change').click(function(){
	$(this).toggleClass('red');
});

// Exercice 3 

$('.verifyEmpty').click(function(){
	if($.trim($('.maybeEmpty').val()) === ''){
		alert('C\'est vide');
	}
});







