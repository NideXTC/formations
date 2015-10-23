function show(param){
	console.log(param);
}
var i = 0;
var interval = setInterval(function(){
	i++;
	if(i===3){
		clearInterval(interval);
	}
	show('coucou');

}, 1000);