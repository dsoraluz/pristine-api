const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    country: {type: String},
    state: {type: String},
    county: {type: String},
    city: {type: String},
    zipCode: {type: String}
  },
  {
    timestamps:
    {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
