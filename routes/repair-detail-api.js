const express = require('express');
const repairDetailsApi = express.Router();

const mongoose = require('mongoose');
const RepairDetail = require('../models/repair-detail-model');
const Device = require('../models/device-model');
const Customer = require('../models/customer-model');
const Location = require('../models/location-model');

const nodemailer = require('nodemailer');


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
    city: req.body.area}
  );



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
    repairCost: req.body.repairCost,
    location: theLocation,
    requestedDate: req.body.requestedDate,
    requestedTime: req.body.requestedTime
  });

  // theCustomer.save((err)=>{
  //   if(err){
  //     res.json(err);
  //     return;
  //   }
  //   res.json({
  //     message: 'new customer added!',
  //     id: theRepair._id
  //   });
  // });
  //
  // theLocation.save((err)=>{
  //   if(err){
  //     res.json(err);
  //     return;
  //   }
  //   res.json({
  //     message: 'new location added!',
  //     id: theRepair._id
  //   });
  // });


  theRepair.save((err)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json({
      message: 'new device added!',
      id: theRepair._id
    });

    const companyEmail = process.env.GMAIL_USERNAME;

    let toFirstName = req.body.firstName;
    let phone = req.body.phone;
    let email = req.body.email;
    let county = req.body.county;
    let area = req.body.area;
    let device = req.body.device;
    let model = req.body.model;
    let color = req.body.color;
    let issue = req.body.repairType;
    let cost = req.body.repairCost;
    let date = req.body.requestedDate;
    let time = req.body.requestedTime;

    // Create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USERNAME, //User Email address
          pass: process.env.GMAIL_PASSWORD
        }
      });

      // Setup email data with unicode symbols
      let mailOptions = {
        // Sender address
        from: `Pristine Wireless <pristine.wireless@gmail.com>`,
        // List of receivers
        to: `${companyEmail}, ${email}`,
        // Subject Line
        subject: `The Next Step To Repair Your Device`,
        // Plain text body
        html: `<h4> Device: ${device} ${model}, ${color} </h4><br/><br/>
        <h4> Issue: ${issue} </h4><br/><br/>
        <h4> cost: $${cost} </h4><br/><br/>
        <h4> Date and Time: ${date}, ${time} </h4><br/><br/>
        <h4> Name: ${toFirstName} </h4><br/><br/>
        <h4> County: ${county} </h4><br/><br/>
        <h4> Area: ${area} </h4><br/><br/>
        <h4> Email: ${email} </h4><br/><br/>
        <h4> Phone: ${phone} </h4><br/><br/>`
      };

      // Send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error){
          res.send(500);
          console.log(error);
          return;
        }else {
          console.log('Message %s sent: %s', info.messageId, info.response);
          transporter.close();
          // res.redirect('/');
        }
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
