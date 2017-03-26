const express = require('express');
const devicesApi = express.Router();

const mongoose = require('mongoose');
const Device = require('../models/device-model');


//API route that gets all devices.
devicesApi.get('/devices',(req,res,next)=>{
  Device.find((err,deviceList)=>{
    if (err){
      res.json(err);
      return;
    }
    res.json(deviceList);
  });
});

devicesApi.get('/devices/model-numbers', (req,res,next)=>{
  Device.find({}, 'modelNumbers',(err,modelNumbers)=>{
    if (err){
      res.json(err);
      return;
    }
    res.json(modelNumbers);
  });
});

// //Route to get device info by id (for edit purposes)
devicesApi.get('/devices/:id',(req,res,next)=>{
  //More specific check that checks if the param in Id is a valid.
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400)
    .json({message: 'Specified id is not valid'});
    return;
  }
  Device.findById(req.params.id, (err, theDevice)=>{
    if (err){
      res.json(err);
      return;
    }
    res.json(theDevice);
  });
});


devicesApi.get('/devices/:id/model', (req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400)
    .json({message: 'Specified id is not valid'});
    return;
  }
  Device.findOne({'_id': req.params.id}, 'model', (err, theModel)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(theModel);
  });
});

devicesApi.get('/devices/:id/colors', (req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400)
    .json({message: 'Specified id is not valid'});
    return;
  }
  Device.findOne({'_id': req.params.id}, 'colors', (err, theColors)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(theColors);
  });
});

devicesApi.get('/devices/:id/repairs', (req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400)
    .json({message: 'Specified id is not valid'});
    return;
  }
  Device.findOne({'_id': req.params.id}, '-_id repair', (err, theRepairs)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(theRepairs);
  });
});







// ------------------------ BELOW WILL BE IMPLEMENTED AT A LATER DATE ----------

// Other device routes (create, edit , search , and delete).. will be implemented in future.
// Devices are currently static and will be updated manually by admin.


//Route to add a new device
// devicesApi.post('/devices', (req,res,next)=>{
//
//
//   const theDevice = {
//     brand: req.body.brand,
//     device: req.body.device,
//     model: req.body.model,
//     colors: req.body.color,
//     repair:[
//       {"screen": 279},
//       {"battery": 69},
//       {"dead": 69},
//       {"diaognostic": 69},
//       {"other": 69}
//     ],
//     modelNumbers: ["A1661", "A1784", "A1785"]
//   };
//
//   theDevice.save((err)=>{
//     if(err){
//       res.json(err);
//       return;
//     }
//     res.json({
//       message: 'new device added!',
//       id: theDevice._id
//     });
//   });
// });
//
// //Route to get device info by id (for edit purposes)
// devicesApi.get('/devices/:id',(req,res,next)=>{
//
// });
//
// //Route to put device info by if (for edit purposes)
// devicesApi.put('/devices:id', (req,res,next)=>{
//
// });
//
// //Route to delete device info
// devicesApi.delete('/devices:id', (req,res,next)=>{
//
//
// });


module.exports = devicesApi;
