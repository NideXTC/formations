const express = require('express');
const session = require('express-session'); 

var app = express(); 
app.use(session({
	resave : false, 
	saveUninitialized: true, 
	secret: "coucou"
})); 

// GET 
app.get('/', (req, res) => {
	res.send(req.session.toto);
}); 

// POST 
app.post('/', (req, res) => {
	req.session.toto = "tata";
	res.send('POST');
}); 


app.listen(3000);

