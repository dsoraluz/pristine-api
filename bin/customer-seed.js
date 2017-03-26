const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Location = require('../models/location-model');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const Customer = require('../models/customer-model.js');

const mikeLocation = new Location({county: "Miami", city: "FIU"});
const richardLocation = new Location({county: "Broward", city: "Miramar"});

const customers = [
  {
    firstName: "Mike",
    lastName: "Garr",
    phone: "305-304- 5622",
    email: "mgarr@gmail.com",
    location: mikeLocation,
    // repairsReceived: {type: Array},
    // reviews:{type: Array},
  },
  {
    firstName: "Richard",
    lastName: "Mitchell",
    phone: "305-304-4561",
    email: "rmit@gmail.com",
    location: richardLocation,
    // repairsReceived: {type: Array},
    // reviews:{type: Array},
  }

];

Customer.create(customers, (err, docs)=>{
  if(err){
    throw(err);
  }
  docs.forEach((customer)=>{
    console.log(`${customer.firstName} ${customer._id}`);
  });

  mongoose.disconnect();
});
