var express = require('express');
var router = express.Router();

var cars = require('../controllers/Cars'); // Nous allons récuperer notre controlleur fait précédement

/* GET Récupère la liste des utilisateurs */
router.get('/', cars.index);
router.post('/', cars.create);

/*
router.route('/')
    .get(cars.index)
    .post(cars.create);
*/

module.exports = router;