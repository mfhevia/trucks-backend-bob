'use strict';

module.exports = models => (req, res) => {
  const { lat, lng } = req.body;

  models.Truck.findClosest({ lat, lng })
    .then(truck => res.json(truck))
    .catch(err => {
      res.boom.badImplementation(err)
    });
};
