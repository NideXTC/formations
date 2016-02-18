var express = require('express');
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
    res.send('delete');
});

app.post('/',  function (req, res) {
    res.send('post');
});

