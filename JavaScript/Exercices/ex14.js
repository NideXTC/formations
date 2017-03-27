// On init le compteur en dehors !

// ES5
let compteur = 1;

const interval = setInterval(function(){
    if(compteur > 2){
        clearInterval(interval);
    }
    compteur++;
    console.log('coucou');
},1000);


// ES6

const interval = setInterval(() => {
    if(compteur > 2){
        clearInterval(interval);
    }
    compteur++;
    console.log('coucou');
},1000);