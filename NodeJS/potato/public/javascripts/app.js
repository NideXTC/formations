var socket = io.connect('http://localhost:3000'); // On se connecte au socket du serveur pour avoir les informations en temps réel

// Si le socket nous informe qu'il y a une notification qui se nomme UserState, il executera le callback.
socket.on('UserState', function (data) {
    // nous insérons dans la span la valeur envoyée par le socket
    $('.connected-number').text(data);
});