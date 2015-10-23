console.time('timeout');
setTimeout(function(){ 
	console.log('coucou');
	console.timeEnd('timeout');
},2000);
