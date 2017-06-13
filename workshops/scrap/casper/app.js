var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});

/*casper.start('http://argusagricole.com/');

casper.then(function () {
    casper.captureSelector('capt.jpg','.col-lg-3');
    this.echo(this.evaluate(function () {
        return document.querySelector('.col-lg-3').innerHTML;
    }));
});
*/


casper.start('http://lacentrale.fr');


casper.then(function(){
    var slider = this.evaluate(function () {
        //return document.getElementById('header_slider_container').innerHTML;
        return document.querySelectorAll('.maClasse').innerHTML;
    });


    this.echo('Premier titre ' + slider);
});

casper.run();