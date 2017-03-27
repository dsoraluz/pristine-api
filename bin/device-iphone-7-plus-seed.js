const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const Device = require('../models/device-model.js');

const devices = [
  {
    brand: "Apple",
    device: "iPhone",
    model: "7 Plus",
    colors: ["Gold", "Silver","Rose Gold", "Black", "Jet Black"],
    repairType:["Screen", "Battery", "Won't Turn On", "Diognostic", "Other"],
    repairCost: [279, 69, 69, 69, 69],
    modelNumbers: ["A1661", "A1784", "A1785"]
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
