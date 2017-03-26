const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const deviceSchema = new Schema(
  {
    brand: {type: String},
    device: {type: String},
    model: {type: String},
    colors: {type: Array},
    repair: {type: Array},
    modelNumbers: {type: Array}
  },
  {
    timestamps:
    {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
