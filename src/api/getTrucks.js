'use strict';

module.exports = models => (req, res) => {
  return models.Truck.find({ connected: true})
    .then(trucks => res.json({ trucks }))
    .catch(err => res.boom.badImplementation(err));
}