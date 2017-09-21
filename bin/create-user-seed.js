const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const User = require("../models/user-model.js");

const password = process.env.ADMIN_PASSWORD;
const phoneNumber = process.env.PHONE_NUMBER;

//Encypt password
const salt = bcrypt.genSaltSync(10);
const hashPass = bcrypt.hashSync(password, salt);

const user = {
  firstName: "Daniel",
  lastName: "Soraluz",
  email: "d.soraluz@gmail.com",
  encryptedPassword: hashPass,
  dateOfBirth: 06132017,
  phone: phoneNumber,
  address: {
    street: "15301 SW 20th St",
    city: "Miramar",
    state: "Florida",
    zip: "33027"
  },
  role: "ADMIN"
};

User.create(user, (err, doc)=>{
  if (err){
    throw(err);
  }
  console.log(`${doc._id} ${doc.firstName} ${doc.lastName}`);

  mongoose.disconnect();

});
