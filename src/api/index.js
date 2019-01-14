'use strict';

const express = require('express');

const getTrucks = require('./getTrucks');
const sendStatusEvent = require('./sendStatusEvent');
const closestTruck = require('./closestTruck');

module.exports = (router, models, socket) => ({
  register: () => {
    router.get('/trucks', getTrucks(models));
    router.post('/status-event', sendStatusEvent(socket));
    router.post('/closest-truck', closestTruck(models));

    return router;
  }
});
