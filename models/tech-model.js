const mongoose = require('mongoose');
const Location = require('../models/location-model');
const Repair = require('../models/repair-detail-model');
const Review = require('../models/review-model');

const Schema = mongoose.Schema;

const techSchema = new Schema(
  {
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    email: {type: Array},
    serviceArea: {type: Object},
    repairs: {type: [Repair.schema]},
    reviews: {type: [Review.schema]},
  },
  {
    timestamps:
    {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Tech = mongoose.model('Tech', techSchema);

module.exports = Tech;
