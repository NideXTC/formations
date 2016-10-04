var express = require('express');
var router = express.Router();

var cars = require('../controllers/Cars'); // Nous allons récuperer notre controlleur fait précédement

/* GET Récupère la liste des utilisateurs */
router.get('/', cars.index);



module.exports = router;