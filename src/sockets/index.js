'use strict';

const { DRIVER_STATUS_RESPONSE, DRIVER_GEOLOCATION } = require('../constants');
const responseStatus = require('./responseStatus');
const driverGeolocation = require('./driverGeolocation');

module.exports = (server, models) => ({

  init: () => {
    const io = require('socket.io')(server);
      
    io.on('connection', socket => {
      console.log('Socket server connected with truck emulator');
      
      socket.on(DRIVER_STATUS_RESPONSE, responseStatus(models));
      socket.on(DRIVER_GEOLOCATION, driverGeolocation(models));
    });

      return io;
  }
});
