var path = require('path');
var router = require('express')();
var security = require('../middlewares/security');
require('express-reverse')(router);
router.disable('x-powered-by');
router.set('views',path.join(__dirname, '../../app/views/countries'));

var countries = require('../controllers/Countries');

router.get('countries.index','/countries', security.csrf, countries.index );
router.post('countries.create','/countries', security.csrf, countries.create );
router.put('countries.update','/countries', security.csrf, countries.update );
router.delete('countries.delete','/countries', security.csrf, countries.delete );

module.exports = router;
