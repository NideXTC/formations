// Si tu as une seule condition à traiter 

var a = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('Promise');
    },2000);
});

a.then(function(data){
    console.log(data);
});

// ====================================================================== //


// Si tu as plusieurs conditions à vérifier d'un coup 

var b = [];

console.time('all');
b[0] = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('All 0');
    },2000);
});

b[1] = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('All 1');
    },3000);
});

Promise.all(b).then(function(data){
    console.timeEnd('all'); // 3 secondes 
    console.log(data);
});

 
//  Alors qu'en callback hell on aurait des appels qui prendraient plus de temps qu'avec une promise 

console.time('callbackHell');
setTimeout(function(){
        console.log('Callback Hell 0');
        setTimeout(function(){
            console.log('Callback Hell 1');
            console.timeEnd('callbackHell'); // 5 secondes
        },3000);
    },2000);


// ====================================================================== //

// Si tu dois tester un callback puis un suivant etc ... 

var callback1 = new Promise(function(resolve, reject){
    setTimeout(resolve, 1000, 'Callback1');  // identique à : setTimeout(function(){resolve('Callback1')}, 1000);
});

var callback2 = callback1.then(function(data){
    console.log('Le callback2 a reçu : ', data);
    return new Promise(function(resolve, reject){
        setTimeout(resolve, 1000, 'Callback2');
    });
});

var callback3 = callback2.then(function(data){
    console.log('Le callback3 a reçu : ', data);
    return new Promise(function(resolve, reject){
        setTimeout(resolve, 1000, 'Callback3');
    });
});

callback3.then(function(data){
    console.log('Le callback4 a reçu : ', data);
});