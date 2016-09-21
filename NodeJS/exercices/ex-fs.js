'use strict'; 

const fs = require('fs'); 

fs.writeFile('test.html', 'bonjour', function(err){
	console.log('saved');
});