const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const Device = require('../models/device-model.js');

const devices = [
  {
    brand: "Apple",
    device: "iPhone",
    model: "5S",
    colors: ["Space Gray", "Gold","Silver"],
    repairType:["Screen", "Battery", "Won't Turn On", "Diognostic", "Other"],
    repairCost: [60, 69, 69, 69, 69],
    modelNumbers: ["A1533", "A1457", "A1530", "A1453"]
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
