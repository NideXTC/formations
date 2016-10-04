const models  = require('../models');

var Cars = {
    index: function (req, res) {
        models
            .Car
            .findAll()
            .then(function(cars) {
                res.render('cars/index', {
                    cars: cars
                });
            });

    },
    create : function(req, res) {
        models.Car.create({ brand: 'foo', km: '12'}).then(function() {
            res.send({error : null});
        }, function () {
            res.send({error : '1'});
        });
    }
};

module.exports = Cars;