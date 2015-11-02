var express = require('express');
var app = express();
var path = require('path'); 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',function(err){
	if(err) throw err;
});

app.set('view engine', 'jade');

var schema = mongoose.Schema;

var Student = mongoose.model('Student' , new schema({
	name : String, 
	firstName : String,
	email : String
}));

var server = app.listen(3000,function(){
	console.log('Hello');
});

app.get('/',function(req, res){
	Student.find({},function(err, user){
		if(err) throw err;

		res.json(user);
	});
	
});

app.get('/test-jade',function(req,res){
	res.render(path.join(__dirname,'index'), {itsABoolean : true});
});

app.put('/',function(req, res){
	// chemin abolu vers le fichier index.html
	
	 Student.update({}, { name: 'bobby' }, {multi :true},function(){
		res.send('done');
	});
});

app.post('/',function(req,res){
	var bob = new Student({
		name : "Bob",
		firstName :  "Sponge",
		email : "sponge.bob@square.com"
	});
	bob.save();
});

app.delete('/',function(req,res){
	res.json({"bien" : "bien?"});
});







