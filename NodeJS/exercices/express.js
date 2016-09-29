const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/chocolat');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

var studentSchema = {
    name: String,
    password: String,
    email: String
};

var Student = mongoose.model('Student', studentSchema);

app.set('view engine', 'pug');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "coucou"
}));


app.get('/', (req, res) => {
    res.render('index', {cle: 'valeur'});
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/liste', (req, res) => {
    Student.find({}, (err, students) => {
        //console.log(students);
        res.render('list', {students: students});
    });
});

app.get('/connect', (req, res) => {
    res.render('connect');
});

app.get('/sub', (req, res) => {
    res.render('sub');
});

app.post('/sub', (req, res) => {
    // Ajouter l'utilisateur en BDD
    if (req.body.lastname && req.body.pass && req.body.email) {

        var Alexis = new Student({
            name: req.body.lastname,
            password: req.body.pass,
            email: req.body.email
        });

        Alexis.save(err => {
            if (!err) {
                res.redirect('back');
            }
        });
    }
});

// POST 
app.post('/list', (req, res) => {
    req.session.toto = "tata";
    res.end();
});


app.listen(3000);

