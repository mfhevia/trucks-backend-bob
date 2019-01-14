const express = require('express');
const bodyParser = require('body-parser');
const boom = require('express-boom');
const morgan = require('morgan')

const app = express();
//TODO MOVE THIS TO API
const router = express.Router();

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
const socket = require('./socket')(server)
const io = socket.init();

//const models = require('./src/models');
//const controllers = require('./src/api/controllers')(router, models);

//controllers.register();
app.use('/', router);

// exports server instance
module.exports = server;
