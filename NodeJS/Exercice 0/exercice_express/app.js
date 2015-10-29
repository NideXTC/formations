var express = require('express');
var app = express();
var path = require('path'); 

var server = app.listen(3000,function(){
	console.log('Hello');
});

app.get('/',function(req, res){
	res.send('Hello');
});

app.put('/',function(req, res){
	// chemin abolu vers le fichier index.html
	res.sendFile( path.join(__dirname, 'index.html')); 
});







