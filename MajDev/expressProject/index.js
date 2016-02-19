var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');

var app = express();
var server = app.listen(3000, function () {
    console.log('Hello');
});

var schema = new Schema({
    name: {type: String, required: true},
    firstName: {type: String, required: true},
    email: {type: String, required: true},
    createdOn: {type: Date, default: Date.now}
});

var User = mongoose.model('User', schema, 'users');

app.get('/',  function (req, res) {
    User.find({},function(err, users){
        if(!err){
            res.send(users);
        } else {
            console.error(err);
        }
    });
});

app.put('/',  function (req, res) {
    // Modifier
});

app.delete('/',  function (req, res) {
    // supprimer
});

app.post('/',  function (req, res) {
    var jacob = new User({
        name : 'jacob',
        firstName : 'jacob',
        email : 'jacob@jacob.com'
    });


    jacob.save(function(err){
        if(err){
            console.error(err);
        }
        res.end();
    });

});

