var casper = require('casper').create({
    verbose: false,
    logLevel: 'debug',
    viewportSize: {
        width: 1330,
        height: 768
    },
    pageSettings: {
        "userAgent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        "loadImages": false,
        "loadPlugins": false,
        "webSecurityEnabled": false,
        "ignoreSslErrors": true
    }
});

var url = 'https://www.booking.com/searchresults.fr.html?label=gen173nr-1FCAEoggJCAlhYSDNiBW5vcmVmaE2IAQGYAQ24AQfIAQzYAQHoAQH4AQuSAgF5qAID;sid=cf74347258f0d9d89aad1bac17ee423e;checkin_month=6;checkin_monthday=12;checkin_year=2017;checkout_month=6;checkout_monthday=13;checkout_year=2017;class_interval=1;dest_id=-1436972;dest_type=city;dtdisc=0;group_adults=2;group_children=0;inac=0;index_postcard=0;label_click=undef;mih=0;no_rooms=1;offset=0;postcard=0;qrhpp=0f00b7653bbc172c99de53e6627e5f84-city-0;room1=A%2CA;sb_price_type=total;search_pageview_id=0f5e45c668e00082;search_selected=0;src=index;src_elem=sb;ss=la+loupe;ss_all=0;ss_raw=la+loupe%60;ssb=empty;sshis=0;origin=search;srpos=1';

casper.start(url);

casper.then(function(){
    var price = this.evaluate(function(){
        return document.querySelectorAll('.sr_item_new')[1].querySelector('.price b').innerHTML.split(';')[1].trim();
    });

    this.echo('Le prix est de ' + price + '€');
});

casper.run();