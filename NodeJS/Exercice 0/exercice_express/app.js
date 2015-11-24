var express = require('express');
var app = express();
var path = require('path'); 
var mongoose = require('mongoose');
var session = require('express-session'); 

app.use(session({
  secret: 'CestSuper SECRET',
  resave: false,
  saveUninitialized: true
}))

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
		// res.json(user);
		res.render(path.join(__dirname,'BDD'),{"users" : user})
	});
	
});

app.get('/set-name',function(req,res){
	req.session.name = "Josay";
	res.send('TT');
});

app.get('/get-name',function(req,res){
	res.send(req.session.name);
});

app.get('/destroy',function(req,res){
	req.session.destroy(function(){
		res.send('FINI');
	});
});


app.get('/test-jade',function(req,res){
	res.render(path.join(__dirname,'index'), {itsABoolean : true});
});

app.get('/test-jade2',function(req,res){
	res.render(path.join(__dirname,'index2'), {paramHTML : "<strong>TOI</strong>"});
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







