const express = require('express');
const techsApi = express.Router();

const mongoose = require('mongoose');
const Tech = require('../models/tech-model');
const Location = require('../models/location-model');

techsApi.get('/techs',(req,res,next)=>{
  Tech.find((err,techList)=>{
    if (err){
      res.json(err);
      return;
    }
    res.json(techList);
  });
});


//Route to add a new device
techsApi.post('/techs', (req,res,next)=>{

  const county = req.body.county;
  const city = req.body.city;

  const serviceArea =  new Location({county: county, city: city});

  const theTech = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    serviceArea: serviceArea,
  };

  theTech.save((err)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json({
      message: 'new tech added!',
      id: theTech._id
    });
  });

});

//Route to get device info by id (for edit purposes)
techsApi.get('/techs/:id',(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400)
    .json({message: 'Specified id is not valid'});
    return;
  }
  Tech.findById(req.params.id, (err, theTech)=>{
    if (err){
      res.json(err);
      return;
    }
    res.json(theTech);
  });

});

//Route to put device info by if (for edit purposes)
techsApi.put('/techs:id', (req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400)
    .json({message: 'Specified id is not valid'});
    return;
  }

  const serviceArea =  new Location({county: req.body.county, city: req.body.city});

  const updates = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    serviceArea: serviceArea,
  };

  Tech.findByIdAndUpdate(req.params.id, updates, (err)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json({
      message: 'Tech updated successfully.'
    });
  });
});

//Route to delete device info
techsApi.delete('/techs:id', (req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400)
    .json({message: 'Specified id is not valid'});
    return;
  }

  Tech.remove({_id: req.params.id}, (err)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json({
        message: 'Tech has been removed!'
    });
  });
});



module.exports = techsApi;
