var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Schema = mongoose.Schema;
var path = require('path');
var session = require('express-session');
var lusca = require('lusca');

mongoose.connect('mongodb://localhost/test');


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function () {
    console.log('Hello');
});

io.on('connection', function (socket) {
    console.log('new user');

    socket.broadcast.emit('Users', io.engine.clientsCount);
    socket.emit('Users', io.engine.clientsCount);

    console.log(io.sockets.length);

    socket.on('tata', function () {
        console.log("tata");
    });

    socket.on('form', function (d) {
        console.log(d);
        socket.emit('form', 'good');
    });


    io.on('disconnect', function () {
        socket.broadcast.emit('Users', io.engine.clientsCount);
        socket.emit('Users', io.engine.clientsCount);
    });
});


app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var schema = new Schema({
    name: {type: String, required: true},
    firstName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: false},
    createdOn: {type: Date, default: Date.now}
});


app.use(session({
    secret: 'abc',
    resave: true,
    saveUninitialized: true
}));


app.use(lusca({
    csrf: true,
    csp: {/* ... */},
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    hsts: {maxAge: 31536000, includeSubDomains: true, preload: true},
    xssProtection: true
}));

var User = mongoose.model('User', schema, 'users');

app.get('/register', function (req, res) {
    res.render('register');
});

app.post('/register', function (req, res) {
    console.log(req.body);

    var u = new User({
        name: req.body.name,
        firstName: req.body.first_name,
        email: req.body.email,
        password: req.body.password
    });

    //test
    res.render('register', {user: req.body});


    u.save(function (err) {
        if (err) throw err;
        res.redirect('back');
    });
});


app.get('/', function (req, res, next) {
    res.render('index');

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
    User.find({}, function (err, user) {
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




























