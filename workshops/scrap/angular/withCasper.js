var casper = require('casper').create({
  verbose: false,
  logLevel: "debug"
});

casper.start('https://deercoders.com/'); 

casper.then(function(){
	if(this.exists('span#email')) {
		this.echo(this.fetchText('span#email'));
        this.captureSelector('email.png', 'span#email');
    }
});

casper.run();