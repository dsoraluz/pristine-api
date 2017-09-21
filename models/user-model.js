const mongoose = require('mongoose');
const Location = require('../models/location-model');
const Repair = require('../models/repair-detail-model');
const Review = require('../models/review-model');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  encryptedPassword: String,
  dateOfBirth: String,
  phone: Number,
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number
  },
  taxIDSSN: Number,
  serviceArea: {type: Object},
  repairs: {type: [Repair.schema]},
  reviews: {type: [Review.schema]},
  role: {
    type: String,
    enum: ['ADMIN', 'TECH'],
    default: 'TECH'
  }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
