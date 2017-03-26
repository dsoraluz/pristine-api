const mongoose = require('mongoose');
const Location = require('../models/location-model');
const Repair = require('../models/repair-detail-model');
const Device = require('../models/device-model');

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    email: {type: String},
    location: {type: Object},
    repairsReceived: {type: Array},
    reviews:{type: Array},
  },
  {
    timestamps:
    {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
