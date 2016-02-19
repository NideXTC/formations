var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Schema = mongoose.Schema;
var path = require('path');

mongoose.connect('mongodb://localhost/test');

var app = express();
var server = app.listen(3000, function () {
    console.log('Hello');
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

var schema = new Schema({
    name: {type: String, required: true},
    firstName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: false},
    createdOn: {type: Date, default: Date.now}
});

var User = mongoose.model('User', schema, 'users');

app.get('/', function (req, res) {

    User.find({}, function (err, users) {
        if (!err) {
            res.send(users);
        } else {
            console.error(err);
        }
    }).select('-__v');
});


app.put('/', function (req, res) {
    console.log(req.query);

    User.findById(req.query.id, function (err, user) {
        console.log(user);

        user.name = 'Nom';

        user.save(function (err) {
            if (err) console.log(err);
        });
    });

    res.end();
});


app.put('/:id', function (req, res) {

    console.log(req.body);

    User.findOne({_id: req.params.id}, function (err, user) {


        user.name = req.body.name || '';

        user.save(function (err) {
            if (err) console.log(err);
        });
    });

    res.end();
});

app.delete('/', function (req, res) {
    User.find({_id: '56c6d90b196b51e30274492e'}, function (err, user) {
        if (!err) {
            user[0].remove();
        } else {
            console.error(err);
        }
        res.end();
    });
});

app.post('/', function (req, res) {
    var jacob = new User({
        name: 'jacob',
        firstName: 'jacob',
        email: 'jacob@jacob.com'
    });


    jacob.save(function (err) {
        if (err) {
            console.error(err);
        }
        res.end();
    });

});


app.post('/test', function (req, res) {
    console.log(req.body);
    console.log(req.query);
    res.end();
});

app.get('/test', function (req, res) {
    console.log(req.body);
    console.log(req.query);
    res.end();
});

app.get('/jade', function (req, res) {
    res.render('index', {title: 'coucou'});
});





























