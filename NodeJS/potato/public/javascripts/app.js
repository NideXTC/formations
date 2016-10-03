var socket = io.connect('http://localhost:3000'); // On se connecte au socket du serveur pour avoir les informations en temps réel

// Si le socket nous informe qu'il y a une notification qui se nomme UserState, il executera le callback.
socket.on('UserState', function (data) {
    // nous insérons dans la span la valeur envoyée par le socket
    $('.connected-number').text(data);
});

//ES6
document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault();
    socket.emit('message', document.querySelector('#message').value);
    document.querySelector('form input').value ='';
    return false;
});

socket.on('message', function(data){
    document.querySelector('ul').innerHTML += `<li>${data}</li>`;
});


socket.on('init', function(data){
    data.forEach(v => document.querySelector('ul').innerHTML += `<li>${v}</li>`) ;
});


//jQuery
/*
$('form').on('change', function(e){
   e.preventDefault();
    socket.emit('message', $(this).serializeArray());
});*/