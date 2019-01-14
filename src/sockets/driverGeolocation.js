'use strict';

module.exports = models => ({ payload }) => {

  console.log(`Received new drive geolocation event ${JSON.stringify(payload)}, updating data...`);
  const { driverId, lat, lng } = payload;

  const location = {
    type: 'Point',
    coordinates: [lng, lat],
  };

  models.Truck.findOne({ driverId })
    .then(truck => {
      if (!truck) {
        // create
        return models.Truck.create({
          driverId,
          connected: true,
          location,
        })
      }

      // update     
      truck.connected = true;
      truck.location = location;
      return truck.save();        
    })
    .then(truck => console.log(`Updated successfully ${truck}`))
    .catch(console.error);
};
