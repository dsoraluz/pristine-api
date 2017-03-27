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
  },
  {
    brand: "Apple",
    device: "iPhone",
    model: "7",
    colors: ["Gold", "Silver","Rose Gold", "Black", "Jet Black"],
    repairType:["Screen", "Battery", "Won't Turn On", "Diognostic", "Other"],
    repairCost: [239, 69, 69, 69, 69],
    modelNumbers: ["A1660", "A1778", "A1779"]
  },
  {
    brand: "Apple",
    device: "iPhone",
    model: "SE",
    colors: ["Space Gray", "Gold","Silver", "Rose Gold"],
    repairType:["Screen", "Battery", "Won't Turn On", "Diognostic", "Other"],
    repairCost: [60, 69, 69, 69, 69],
    modelNumbers: ["A1533", "A1457", "A1530", "A1453"]
  },
  {
    brand: "Apple",
    device: "iPhone",
    model: "6S Plus",
    colors: ["Space Gray", "Gold","Silver", "Rose Gold"],
    repairType:["Screen", "Battery", "Won't Turn On", "Diognostic", "Other"],
    repairCost: [125, 69, 69, 69, 69],
    modelNumbers: ["A1634", "A1687", "A1699"]
  },
  {
    brand: "Apple",
    device: "iPhone",
    model: "6S",
    colors: ["Space Gray", "Gold","Silver", "Rose Gold"],
    repairType:["Screen", "Battery", "Won't Turn On", "Diognostic", "Other"],
    repairCost: [100, 69, 69, 69, 69],
    modelNumbers: ["A1633", "A1688", "A1700"]
  },
  {
    brand: "Apple",
    device: "iPhone",
    model: "6 Plus",
    colors: ["Space Gray", "Gold","Silver", "Rose Gold"],
    repairType:["Screen", "Battery", "Won't Turn On", "Diognostic", "Other"],
    repairCost: [100, 69, 69, 69, 69],
    modelNumbers: ["A1524", "A1593"]
  },
  {
    brand: "Apple",
    device: "iPhone",
    model: "6",
    colors: ["Space Gray", "Gold","Silver"],
    repairType:["Screen", "Battery", "Won't Turn On", "Diognostic", "Other"],
    repairCost: [70, 69, 69, 69, 69],
    modelNumbers: ["A1549", "A1586", "A1453"]
  },
  {
    brand: "Apple",
    device: "iPhone",
    model: "5S",
    colors: ["Space Gray", "Gold","Silver"],
    repairType:["Screen", "Battery", "Won't Turn On", "Diognostic", "Other"],
    repairCost: [60, 69, 69, 69, 69],
    modelNumbers: ["A1533", "A1457", "A1530", "A1453"]
  },
  {
    brand: "Apple",
    device: "iPhone",
    model: "5C",
    colors: ["White", "Blue","Green", "Pink", "Yellow"],
    repairType:["Screen", "Battery", "Won't Turn On", "Diognostic", "Other"],
    repairCost: [60, 69, 69, 69, 69],
    modelNumbers: ["A1532", "A1507", "A1529", "A1456"]
  },
  {
    brand: "Apple",
    device: "iPhone",
    model: "5",
    colors: ["White", "Black"],
    repairType:["Screen", "Battery", "Won't Turn On", "Diognostic", "Other"],
    repairCost: [60, 69, 69, 69, 69],
    modelNumbers: ["A1428", "A1429", "A1442"]
  },
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
