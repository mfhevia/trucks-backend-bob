'use strict';

const { Schema, model } = require('mongoose');
const timestamp = require('mongoose-timestamp');

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const truckSchema = new Schema({
  driverId: {
    type: Number,
    required: true,
    index: true
  },
  connected: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: false
  },
  location: {
    type: pointSchema,
    required: false,
    default: null,
    index: '2dsphere'
  },
});

truckSchema.statics.findClosest = function({ lat, lng }) {
  return this.findOne({
    location: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [lat, lng]
        },
        $maxDistance: 900 * 1609.34
      }
    }
  });
};

truckSchema.plugin(timestamp);
module.exports = model('Truck', truckSchema);
