var express = require('express');
var router = express.Router();
var users = require('../controllers/Users');

/* GET users listing. */
router.get('/', users.index);

module.exports = router;
