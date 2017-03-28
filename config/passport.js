//The file holds the Passport Authentication/Authorization information
// and strategies used (Local Strategy).

const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require ('bcrypt');

const User          = require('../models/user');

module.exports = function (passport) {
  passport.use(new LocalStrategy((username, password, next)=>{
    User.findOne({ username }, (err, foundUser)=>{
      //If there is a general error
      if (err){
        next(err);
        return;
      }
      //If there was no username with username provided,
      if (!foundUser){
        next(null, false, {message: 'Incorrect username'});
        return;
      }

      //Function to determine if password matches
      const didPasswordMatch = bcrypt.compareSync(password, foundUser.encryptedPassword);

      if (!didPasswordMatch){
        next(null, false, {message: 'Incorrect Password'});
        return;
      }

      //You get the found user if all checks pass
      next(null, foundUser);
    });
  }));

passport.serializeUser((loggedInUser, cb)=>{
  cb(null, loggedInUser._id);
  });

passport.serializeUser((userIdFormSubmission, cb)=>{
  User.findById(userIdFormSubmission, (err, userDocument)=>{
    if(err){
      cb(err);
      return;
    }
    cb(null, userDocument);
    });
  });
};
