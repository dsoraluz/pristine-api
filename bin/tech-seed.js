const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Location = require('../models/location-model');
const Repair = require('../models/repair-details-model');
const Review = require('../models/review-model');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const Tech = require('../models/tech-model.js');

const danielServiceArea = new Location({county: "Miami", city: "FIU"});
const cesarServiceArea = new Location({county: "Broward", city: "Miramar"});

const techs = [
  {
    firstName: "Daniel",
    lastName: "Suarez",
    phone: "954-633-5010",
    email: "dsoraluz@aol.com",
    serviceArea: danielServiceArea,
    // repairs: {type: [Repair.schema]},
    // reviews: {type: [Review.schema]}
  },
  {
    firstName: "Cesar",
    lastName: "Noles",
    phone: "954-565-5010",
    email: "cnol@aol.com",
    serviceArea: cesarServiceArea,
    // repairs: {type: [Repair.schema]},
    // reviews: {type: [Review.schema]}
  }

];

Tech.create(techs, (err, docs)=>{
  if(err){
    throw(err);
  }
  docs.forEach((tech)=>{
    console.log(`${tech.firstName} ${tech._id}`);
  });

  mongoose.disconnect();
});
