const express = require('/require');
const applyRoutes = express.Router();

const Applicant = require('../models/applicant-model');

applyRoutes.post('/apply', (req,res,next)=>{

});

module.exports = applyRoutes;
