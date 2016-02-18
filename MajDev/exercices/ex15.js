setTimeout(function(){
    console.log('coucou');
},2000);
console.log('fini');

process.on('beforeExit',function(){
   console.log('Really');
});