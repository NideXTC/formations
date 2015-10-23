myVar = 3; 

function tata(){
// le mot clé var permet de garder la variable accessible seulement à l'intérieur d'une function 	
  var myVar = 2; 
}

tata();

console.log(myVar);