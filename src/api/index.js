'use strict';

const express = require('express');
const router = express.Router();

const getTrucks = require('./getTrucks');
const sendStatusEvent = require('./sendStatusEvent');

module.exports = (models, socket) => ({
  register: () => {
    router.get('/trucks', getTrucks(models));
    router.post('/status-event', sendStatusEvent(socket));

    return router;
  }
});
