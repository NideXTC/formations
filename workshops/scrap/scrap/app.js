var scrap = require('scrap');

scrap('http://argusagricole.com/',function(err, $){
	console.log($('ng-binding').text());
	//$('body').remove();
});