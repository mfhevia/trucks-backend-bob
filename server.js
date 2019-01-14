'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const boom = require('express-boom');
const morgan = require('morgan')

const app = express();
const router = express.Router();
const server = require('http').createServer(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// standard boom errors in all api error responses
app.use(boom());
// middleware logger
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

// Initializes models
const models = require('./src/models');

//Initializes socket server
const socket = require('./src/sockets')(server, models).init();

// Initializes api controllers
const controllers = require('./src/api')(router, models, socket);
controllers.register();
app.use('/', router);

// exports server instance
module.exports = server;
