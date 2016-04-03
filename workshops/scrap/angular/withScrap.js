var scrap = require('scrap');

scrap('https://deercoders.com',function(err, $){
	console.log('email : ', $('span#email').text());
});