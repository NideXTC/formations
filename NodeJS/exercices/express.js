const express = require('express');
const session = require('express-session'); 
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chocolat');

var app = express();

app.set('view engine', 'pug');

app.use(session({
	resave : false, 
	saveUninitialized: true, 
	secret: "coucou"
})); 


app.get('/', (req, res) => {
	res.render('index');
}); 

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/liste', (req, res) => {
	res.render('index');
});

app.get('/connect', (req, res) => {
	res.render('connect');
});

app.get('/sub', (req, res) => {
	res.render('sub');
});

app.post('/sub', (req, res) => {
	// Ajouter l'utilisateur en BDD
	// Redirection
});

// POST 
app.post('/liste', (req, res) => {
	req.session.toto = "tata";
	res.end(); 
}); 


app.listen(3000);

