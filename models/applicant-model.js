//To be implemented if time allows
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicantSchema = new Schema(
  {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    addressLine2: {type: String},
    city: {type: String, required: true},
    state: {type: String, required: true},
    market: {type: String, required: true},
    zipCode: {type: String, required: true},
    country: {type: String, required: true},
    background: {type: boolean, required: true},
    workInUs: {type: boolean, required: true},
    over18: {type: boolean, required: true},
    bestContactTime: {type: String, required: true},
    ableToStart: {type: String, required: true},
    pastExperience: {type: String, required: true},
    numberOfPhonesDone: {type: String, required: true},
    numberOfTabletsDone: {type: String},
    formalTraining: {type: String},
    referredBy: {type: String, required: true},
  },
  {
    timestamps:
    {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
