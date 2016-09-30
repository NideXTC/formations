var express = require('express');
var router = express.Router();

var users = require('../controllers/Users'); // Nous allons récuperer notre controlleur fait précédement

/* GET Récupère la liste des utilisateurs */
router.get('/', users.index);

/* POST Création d'un nouvel utilisateur */
router.post('/', users.create);

/* PUT Modification d'un utilisateur */
router.put('/:id', users.update);

/* DELETE Suppression d'un utilisateur */
router.delete('/:id(\\d+)', users.delete);

module.exports = router;