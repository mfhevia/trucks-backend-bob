const config = require('getconfig');
const app = require('./server');
const db = require('./db');

const DB_URL = process.env.DB_URL || config.db.url;
db.connect(DB_URL)
  .then(() => {
    const port = process.env.PORT || config.server.port;
    const host = process.env.HOST || config.server.host;
    app.listen(port, () => console.log(`Server listening on ${host}:${port}`));
  });

