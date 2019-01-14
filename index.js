'use strict';

const config = require('getconfig');
const server = require('./server');
const { app } = require('./server');
const db = require('./db');

var cluster = require('cluster');
var http = require('http');

const DB_URL = process.env.DB_URL || config.db.url;
db.connect(DB_URL)
  .then(() => {
    if (cluster.isMaster){
      // create 4 clusters
      for (var i = 0; i < 4; i++){
        cluster.fork();
      }
    } else {
        // create http server
        const s = http.createServer(app).listen(8000);
        const port = process.env.PORT || config.server.port;
        const host = process.env.HOST || config.server.host;
        s.listen(port, () => console.log(`Server listening on ${host}:${port}`));
    }
  });

