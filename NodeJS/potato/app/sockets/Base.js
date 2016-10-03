module.exports = function(io) {
    io.on('connection', function (socket) {
        console.log('New user');
        // On envoie le nombre de personnes actuellement sur le socket à tout le monde (sauf la personne qui vient de se connecter)
        socket.broadcast.emit('UserState', io.engine.clientsCount);
        // On envoie le nombre de personnes actuellement sur le socket à la personne qui vient de se connecter
        socket.emit('UserState', io.engine.clientsCount);

        socket.on('message', data => {
            socket.emit('message', data);
            socket.broadcast.emit('message', data);
        });



        socket.on('disconnect', function () {
            console.log('User gone');
            // On prévient tout le monde qu'une personne s'est deconnectée
            socket.broadcast.emit('UserState', io.engine.clientsCount);
        });
    });
}; 