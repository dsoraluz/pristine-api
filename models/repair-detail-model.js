const mongoose = require('mongoose');

const Location = require('../models/location-model');
const Device = require('../models/device-model');
const Review = require('../models/review-model');
const Tech = require ('../models/tech-model');
const Customer = require ('../models/customer-model');

const Schema = mongoose.Schema;

const repairDetailSchema = new Schema(
  {
    tech: {type: [Tech.schema]},
    customer: {type: [Customer.schema]},
    deviceName: {type: String},
    deviceModel: {type: String},
    deviceColor: {type: String},
    repairType: {type: String},
    repairCost: {type: String},
    review: {type: [Review.schema]},
    location: {type: [Location.schema]},
    dateRequested: {type: Date},
    dateCompleted: {type: Date}
  },
  {
    timestamps:
    {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const RepairDetail = mongoose.model('RepairDetail', repairDetailSchema);

module.exports = RepairDetail;
