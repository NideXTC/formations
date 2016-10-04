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

    }
};

module.exports = Cars;