'use strict';

const express = require('express');

const getTrucks = require('./getTrucks');
const sendStatusEvent = require('./sendStatusEvent');

module.exports = (router, models, socket) => ({
  register: () => {
    router.get('/trucks', getTrucks(models));
    router.post('/status-event', sendStatusEvent(socket));

    return router;
  }
});
