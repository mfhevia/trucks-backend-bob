'use strict';

const { DRIVER_STATUS_REQUEST } = require('../constants');

module.exports = socket => (req, res) => {
    try {
      socket.emit(DRIVER_STATUS_REQUEST);
      res.status(201).json({
          message: `Sent event ${DRIVER_STATUS_REQUEST} to all the drivers`
      });
    }
    catch(err) {
      return res.boom.badImplementation(err);
    }
};
