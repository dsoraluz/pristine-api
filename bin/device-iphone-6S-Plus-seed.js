const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const Device = require('../models/device-model.js');

const devices = [
  {
    brand: "Apple",
    device: "iPhone",
    model: "6S Plus",
    colors: ["Space Gray", "Gold","Silver", "Rose Gold"],
    repairType:["Screen", "Battery", "Won't Turn On", "Diognostic", "Other"],
    repairCost: [125, 69, 69, 69, 69],
    modelNumbers: ["A1634", "A1687", "A1699"]
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
