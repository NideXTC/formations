var casper = require('casper').create({
  verbose: false,
  logLevel: "debug"
});

casper.start('http://ynov.com/'); 

casper.then(function(){
	this.echo(this.getTitle());
}); 

casper.then(function(res){
	//require('utils').dump(res); 
	this.echo(res.headers[0].value); // apache version 
});

casper.then(function(){
	this.capture('ynov-home.png')
});

casper.then(function(){
	this.clickLabel('Contact', 'a');
});

casper.then(function(){
	this.capture('ynov-contact.png')
});

casper.run();