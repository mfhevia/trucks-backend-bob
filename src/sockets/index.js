'use strict';

//const socketEvents = require('./src/socket-events');

module.exports = (server, models) => ({

    init: () => {
        const io = require('socket.io')(server);
        
        io.on('connection', socket => {
            console.log('Socket server connected with truck emulator');
            socket.on('DRIVER_STATUS_RESPONSE', (msg) => { //use events currified
                // socketEvents.blabla
            })
        });

        return io;
    }
});
