'use strict';

const { DRIVER_STATUS_RESPONSE } = require('../constants');
const responseStatus = require('./responseStatus');

module.exports = (server, models) => ({

  init: () => {
    const io = require('socket.io')(server);
      
    io.on('connection', socket => {
      console.log('Socket server connected with truck emulator');
      
      socket.on(DRIVER_STATUS_RESPONSE, responseStatus(models));
    });

      return io;
  }
});
