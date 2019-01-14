'use strict';

const { DRIVER_STATUS_REQUEST } = require('../constants');

module.exports = socket => (req, res) => {
    socket.emit(DRIVER_STATUS_REQUEST);
    res.json({
        message: `Sent event ${DRIVER_STATUS_REQUEST} to all the drivers`
    });
};
