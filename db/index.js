const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
  console.log('Database connection successful');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongo error connection', err);
  process.exit(1);
});

module.exports = {
  connect: db => mongoose.connect(db, { useNewUrlParser: true, promiseLibrary: global.Promise }),
  close: () => mongoose.connection.close(),
};
