var express = require('express');
var router = express.Router();

var users = require('../controllers/Users');

/* GET la liste des utilisateurs */
router.get('/', users.index);

/* POST la création d'un nouvel utilisateur */
router.post('/', users.create);

/* GET la liste des utilisateurs */
router.put('/:id(\\d+)', users.update); 

/* GET la liste des utilisateurs */
router.delete('/:id(\\d+)', users.delete);

module.exports = router;