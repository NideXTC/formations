var models = require('../../models/');

var Users = {
    index: function (req, res, next) {
        models.sequelize.sync().then(function(){
            models.Bike.create({
                name:"toto"
            });
        });

        res.send('coucou');
    },
    create: function () {

    }
};

module.exports = Users;