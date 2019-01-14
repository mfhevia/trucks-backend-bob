'use strict';

/* 
  I checked that truck-emulator emits so excessive events
  Repeats each driver various times for each request event to update data
  To prevent this, I implements a very basic cache system
  I do some tests and 500 ms seems a good value to don`t repeat drivers responses and ensure all the drivers reply
*/
const cache = {};
const EXPIRED_TIME = 500;

module.exports = models => ({ payload }) => {

    console.log(`Received status event ${JSON.stringify(payload)}, updating data...`);
    const { driverId, status } = payload;

    // Checking last driver event to don`t have a huge load and don`t duplicate trucks in database
    const lastEvent = cache[driverId];
    if (lastEvent > (Date.now() - EXPIRED_TIME)) {
      console.log(`Driver ${driverId} updated so recently, waiting for the next event`);
      return;
    }
    cache[driverId] = Date.now();

    const connected = status === 'stoped' ? false : true;

    models.Truck.findOne({ driverId })
      .then(truck => {
        if (!truck) {
          // create
          return models.Truck.create({
            ...payload,
            connected
          })
        }

        // update
        truck.status = status;
        truck.connected = connected;
        return truck.save();        
      })
      .then(truck => console.log(`Updated successfully ${truck}`))
      .catch(console.error);
};
