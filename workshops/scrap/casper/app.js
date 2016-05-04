var casper = require('casper').create({
  verbose: false,
  logLevel: "debug"
});

casper.start('https://www.ynov.com'); 

casper.then(function getLinks(){
     links = this.evaluate(function(){
        var links = document.getElementsByTagName('a');
        links = Array.prototype.map.call(links,function(link){
            return link.getAttribute('href');
        });
        return links;
    });
});

casper.then(function(){
    this.each(links,function(self,link){
        self.thenOpen(link,function(a){
            this.echo(this.getCurrentUrl());
        });
    });
});


casper.run();