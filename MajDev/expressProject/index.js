var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');

var app = express();
var server = app.listen(3000, function () {
    console.log('Hello');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
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
    User.find({}, function (err, users) {
        if (!err) {
            users[0].email = 'toto';
            users[0].save();
            res.send(users);
        } else {
            console.error(err);
        }
    });
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































