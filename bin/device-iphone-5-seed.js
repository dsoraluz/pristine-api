const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const Device = require('../models/device-model.js');

const devices = [
  {
    brand: "Apple",
    device: "iPhone",
    model: "5",
    colors: ["White", "Black"],
    repairType:["Screen", "Battery", "Won't Turn On", "Diognostic", "Other"],
    repairCost: [60, 69, 69, 69, 69],
    modelNumbers: ["A1428", "A1429", "A1442"]
  }
];

Device.create(devices, (err, docs)=>{
  if(err){
    throw(err);
  }
  docs.forEach((device)=>{
    console.log(`${device.device} ${device.model} ${device._id}`);
  });

  mongoose.disconnect();
});
