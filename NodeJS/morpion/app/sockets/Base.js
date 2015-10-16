'use strict';

var io;

var IO = {
    set: function (IO) {
        io = IO;
        var $this = this;

        this.connection(function (socket) {
            $this.disconnect(socket);
        });
    },
    get: function () {
        return io;
    },
    connection: function (callback) {
        io.on('connection', function (s) {
            s.broadcast.emit('UserState', io.sockets.sockets.length);
            s.emit('UserState', io.sockets.sockets.length);

            callback(s);
        });
    },
    disconnect: function (s) {
        if (s) {
            s.on('disconnect', function () {
                s.broadcast.emit('UserState', io.sockets.sockets.length);
            });
        }
    }
};

module.exports = IO;