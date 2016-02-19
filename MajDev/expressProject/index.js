var express = require('express');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/test');

var app = express();
var server = app.listen(3000, function () {
    console.log('Hello');
});

app.get('/',  function (req, res) {
    res.send('get');
});

app.put('/',  function (req, res) {
    res.send('put');
});

app.delete('/',  function (req, res) {
    var json = {bien : "bien?"};
    res.json(json);
});

app.post('/',  function (req, res) {
    res.send('post');
});

