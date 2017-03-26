const express = require('express');
const repairDetailsApi = express.Router();

const mongoose = require('mongoose');
const RepairDetail = require('../models/repair-detail-model');
const Device = require('../models/device-model');
const Customer = require('../models/customer-model');
const Location = require('../models/location-model');


//Route that returns all repair details from API
repairDetailsApi.get('/repair-details',(req,res,next)=>{
  RepairDetail.find((err,detailsList)=>{
    if (err){
      res.json(err);
      return;
    }
    res.json(detailsList);
  });
});

// Route to create a new repair detail.
repairDetailsApi.post('/repair-details',(req,res,next)=>{


  const theCustomer = new Customer({
    firstName: req.body.firstName,
    email: req.body.email,
    phone: req.body.phone
  });

  const theLocation = new Location({
    county: req.body.county,
    city: req.body.city}
  );

  const dateRequested = new Date();


//---------------- Business Logic ----------------

// const repairCost = 0;
// const model = req.body.model;
// const repairType = req.body.repairType;
//
//   function calcRepair (model,repairType){
//
//   }



  const theRepair= new RepairDetail({
    customer: theCustomer,
    deviceName: req.body.device,
    deviceModel: req.body.model,
    deviceColor: req.body.color,
    repairType: req.body.repairType,
    repairCost: repairCost,
    location: theLocation,
    dateRequested: dateRequested
  });


  theRepair.save((err)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json({
      message: 'new device added!',
      id: theRepair._id
    });
  });
});


// Routes that will allow tech to accept repair, customer to write a review, and
// mark a repair as completed.

// repairDetailsApi.post('/repair-details/:id/accept-repair', (req,res,next)=>{
// // tech: {type: [Tech.schema]},
// // review: {type: [Review.schema]},
// // dateCompleted: {type: Date}
// });






module.exports = repairDetailsApi;
