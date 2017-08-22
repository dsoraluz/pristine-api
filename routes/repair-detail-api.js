const express = require('express');
const repairDetailsApi = express.Router();

const mongoose = require('mongoose');
const RepairDetail = require('../models/repair-detail-model');
const Device = require('../models/device-model');
const Customer = require('../models/customer-model');
const Location = require('../models/location-model');

const nodemailer = require('nodemailer');
const moment = require ('moment');

const handlebars = require('handlebars');
const MJML = require('mjml');


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

    //The MJML template.
    const template = handlebars.compile(`
      <mjml>
        <mj-head>
          <mj-font name="Varela Round" href="https://fonts.googleapis.com/css?family=Varela+Round"/>
          <mj-attributes>
            <mj-all padding="" />
            <mj-class name="preheader" color="#000000" font-size="11px" font-family="'Varela Round', sans-serif" padding="0" />
          </mj-attributes>
          <mj-style inline="inline">
            a { text-decoration: none; color: inherit; }
          </mj-style>

        </mj-head>
        <mj-body>
          <mj-container background-color="#D0D0D0">
            <mj-section full-width="full-width" padding="10px 25px">
              <mj-group>

              </mj-group>
            </mj-section>

            <mj-section background-color="#32373C" padding="10px 0">
              <mj-column>
                <mj-image src="http://i.imgur.com/jHXJgtq.png?1" alt="logo" width="375px" padding="10px 0">
                </mj-image>
              </mj-column>
            </mj-section>
            <mj-section background-color="#ffffff" padding-top="20px">
              <mj-column width="100%">
                <mj-image src="http://i.imgur.com/j4CCMDU.png" width="150px"alt="city" width="px" padding="10px 25px">
                </mj-image>
                <mj-text align="center" font-size="30px" font-weight="bold" line-height="1.5" padding="10px 0">
                  Thank you for scheduling your repair <br/>with Pristine Wireless!
                  <br/>

                </mj-text>
              </mj-column>
            </mj-section>

            <mj-section background-color="#ffffff" padding-top="20px">
              <mj-column>
                <mj-text align="center" color="#32373C" font-size="18px" font-family="Lato, Helvetica, Arial, sans-serif" vertical-align="top">
                  <h4> Device: {{device}} {{model}}, {{color}} </h4>
             		 	<h4> Issue: {{issue}}</h4>
              		<h4> Cost: \${{cost}}</h4>
              		<h4> Date and Time: {{date}}, {{time}} </h4>
             			<h4> Name: {{toFirstName}}</h4>
                  <h4> County: {{county}}</h4>
                  <h4> Area: {{area}}</h4>
              		<h4> Email: {{email}}</h4>
              		<h4> Phone: {{phone}}</h4>
                </mj-text>
              </mj-column>
            </mj-section>

            <mj-section background-color="#fff" padding="20px 0">
              <mj-column>
                <mj-text align="center" padding-left="10px" color="#32373C" font-size="35px" vertical-align="top">
                <strong>What Happens Next?</strong>
              </mj-text>
              </mj-column>
            </mj-section>

            <mj-section background-color="#ffffff" padding="20px 0">
              <mj-column>
                <mj-image src="http://i.imgur.com/jxyEJaC.png" alt="Pristine Specialist" width="135px" padding="0 25px">
                </mj-image>
                <mj-text align="center" color="#32373C" font-size="20px" font-family="Lato, Helvetica, Arial, sans-serif" vertical-align="top" padding="20px 25px">
                  <p style="font-size: 15px;color:#32373C;">Our Pristine Specialists are immediately notified of your request.</p>
                </mj-text>
              </mj-column>
              <mj-column>
                <mj-image src="http://i.imgur.com/fD41LwV.png" alt="message" width="135px" padding="0 25px">
                </mj-image>
                <mj-text align="center" color="#32373C" font-size="20px" font-family="Lato, Helvetica, Arial, sans-serif" vertical-align="top" padding="20px 25px">

                  <p style="font-size: 15px;color:#32373C;">You will receive a call or text message from a Pristine Specialist.</p>
                </mj-text>
              </mj-column>
              <mj-column>
                <mj-image src="http://i.imgur.com/X2wuSoP.png" alt="payment" width="135px" padding="0 25px">
                </mj-image>
                <mj-text align="center" color="#32373C" font-size="20px" font-family="Lato, Helvetica, Arial, sans-serif" vertical-align="top" padding="20px 25px">
                  <p style="font-size: 15px;color:#32373C;">Payment will be received upon completion of repair.</p>
                </mj-text>
              </mj-column>
            </mj-section>

            <mj-section background-color="#32373C" padding="10px">
              <mj-column width="66%">
                <mj-text align="left" color="#ffffff" font-size="14px" font-family="Lato, Helvetica, Arial, sans-serif" vertical-align="top" padding="40px 30px">

                  <span style="font-size:25px; color: #8BC541; font-weight:bold; line-height:30px">Any questions or concerns:</span>
                  <br />
                  <br />
                  <span style="font-size:30px; font-weight:bold">954-633-5010</span>
                </mj-text>
              </mj-column>
              <mj-column width="33%">
                <mj-image src="http://i.imgur.com/Iz1h5vP.png" alt="Last city" align="center" border="none" width="" padding="30px 20px">
                </mj-image>
              </mj-column>
            </mj-section>

            <mj-section background-color="#f3f3f3">
              <mj-column>
                <mj-image align="right" src="http://i.imgur.com/Sh5Drs7.png" href="https://www.instagram.com/pristinewireless/" width="64px" alt="Instagram" align="center" border="none" padding="30px 20px">
                      </mj-image>
              </mj-column>
              <mj-column>
                <mj-image align="center" src="http://i.imgur.com/8wwZ3Ah.png" href="https://www.yelp.com/biz/pristine-wireless-miami-5" width="112px" alt="Yelp" align="center" border="none" padding="2px 20px"></mj-image>
              </mj-column>

              <mj-column>
                <mj-image align="left" src="http://i.imgur.com/bLK0gvq.png" href="https://www.facebook.com/pristinewireless" width="64px" alt="Facebook" align="center" border="none" padding="30px 20px">
                </mj-image>
              </mj-column>
            </mj-section>


            <mj-section background-color="#f3f3f3">
              <mj-column>
                <mj-text align="center">
                  Pristine Wireless &copy 2017
                </mj-text>
              </mj-column>
            </mj-section>

            <mj-section>
              <mj-column>
                <mj-image src="http://z2mx.mjt.lu/img/z2mx/b/l4r/n83.png" alt="bottom border" align="center" border="none" width="600" container-background-color="transparent">
                </mj-image>
              </mj-column>
            </mj-section>

            <mj-section full-width="full-width" padding="10px">

            </mj-section>
          </mj-container>
        </mj-body>
      </mjml>

      `);

      // Create context data to populate template.
      const context = {
        toFirstName: req.body.firstName,
        phone:req.body.phone,
        email: req.body.email,
        county: req.body.county,
        area: req.body.area,
        device: req.body.device,
        model: req.body.model,
        color: req.body.color,
        issue: req.body.repairType,
        cost: req.body.repairCost,
        date: moment(req.body.requestedDate).format('MMM Do YYYY'),
        time: req.body.requestedTime
      };

      //Create mjml email to repair data.
      const mjml = template(context);
      //Transform mjml to html.
      const html = MJML.mjml2html(mjml).html;

      // Setup email data with unicode symbols
      let mailOptions = {
        // Sender address
        from: `Pristine Wireless <pristine.wireless@gmail.com>`,
        // List of receivers
        to: `${companyEmail}, ${email}`,
        // Subject Line
        subject: `The Next Step To Repair Your Device`,
        // Plain text body
        html: `${html}`
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
