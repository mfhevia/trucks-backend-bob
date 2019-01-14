'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const boom = require('express-boom');
const morgan = require('morgan')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// standard boom errors in all api error responses
app.use(boom());
// middleware logger
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

//Initializes websocket
const server = require('http').createServer(app);
//const socket = require('./socket')(server, models)
const socket = require('./src/sockets')(server).init();

const models = require('./src/models');
const controllers = require('./src/api')(models, socket);
const router = controllers.register();
app.use('/', router);

// exports server instance
module.exports = server;
