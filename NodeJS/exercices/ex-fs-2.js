'use strict'; 

const fs = require('fs'); 

const request = require('request');

request('http://www.google.com',  (error, response, body)  => {
  if (!error) {
	    
	fs.writeFile('test.html', body, err => console.log('saved'));

	fs.readFile('test.html', 'utf8', (err, data) => console.log(data));
  }
});
