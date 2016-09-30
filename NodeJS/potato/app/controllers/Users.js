require('../models/User');

var mongoose = require('mongoose'),
    User = mongoose.model('User');


var Users = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */
    index: function (req, res) {

        User.find({}, function (err, users) {
            if (err) throw err;
            res.render('users/index', {title: "users", users: users});
        });


    },
    create: function (req, res) {

        var u = new User({
            name: req.body.name,
            firstName: req.body.firstname,
            email: req.body.email
        });

        u.save(function (err) {
            if (!err) {
                console.log('User inserted');
            }
        });

        res.redirect('/users');
    },
    update: function (req, res) {
        // Mongoose pour l'update
    },
    delete: function (req, res) {

    }
};

module.exports = Users;