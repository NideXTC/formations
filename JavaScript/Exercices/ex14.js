var i = 0;
var interval = setInterval(function(){
	console.log('coucou');
	i++; 
	if(i == 3){
		clearInterval(interval);		
	}
},1000);

var j = 0;
var interval2 = setInterval(_ => {
	console.log('coucou2');
	if(++j == 3)clearInterval(interval2);		
},1000);