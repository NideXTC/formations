var array = [4,3,5,8]; 


array.forEach(function(value, index, arr){
	console.log('El courant : ' , value); 
	console.log('Index : ', index); 
	console.log('Tableau complet : ', arr);
	console.log('------');
}); 

array
.forEach(value => console.log('El courant : ', value)); 