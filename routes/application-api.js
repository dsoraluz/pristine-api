const express = require('express');
const applyApi = express.Router();

const Applicant = require('../models/applicant-model');

applyApi.get('/apply', (req,res,next)=>{
  Applicant.find((err,applicationList)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(applicationList);
  });
});

applyApi.post('/apply', (req,res,next)=>{

  const theApplicant = new Applicant({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    addressLine2: req.body.addressLine2,
    city: req.body.city,
    state: req.body.state,
    market: req.body.market,
    zipCode: req.body.zipCode,
    country: req.body.country,
    background: req.body.background,
    workInUs: req.body.workInUs,
    over18: req.body.over18,
    transportation: req.body.transportation,
    bestContactTime: req.body.bestContactTime,
    ableToStart: req.body.ableToStart,
    pastExperience: req.body.pastExperience,
    experienceDescription: req.body.experienceDescription,
    numberOfPhonesDone: req.body.numberOfPhonesDone,
    numberOfTabletsDone: req.body.numberOfTabletsDone,
    formalTraining: req.body.formalTraining,
    referredBy: req.body.referredBy
  });

  theApplicant.save((err)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json({
      message: 'new applicant added!',
      id: theApplicant._id
    });
  });
});

module.exports = applyApi;
