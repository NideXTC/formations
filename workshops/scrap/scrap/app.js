var scrap = require('scrap');

scrap('http://www.ynov.com',function(err, $){
	console.log($('title').text());
});