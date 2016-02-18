var i = 0;
var interval = setInterval(function () {
    console.log('coucou');
    i++;
    if (i === 3) {
        clearInterval(interval);
    }

}, 500);