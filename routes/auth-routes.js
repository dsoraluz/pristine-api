const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

const User  = require('../models/user-model');

const authRoutes = express.Router();

//Create Tech get route.
authRoutes.get('/create-tech-login', (req, res, next)=>{
  res.render('auth/create-tech-login');
});

//Create Tech post route
authRoutes.post('/create-tech-login', (req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;

  //If user does not provide username or password
  if(!email || !password){
    res.render('auth/create-tech', {errorMessage: "Please fill out an email and password"
  });
  return;
  }

  //Search database with username that user has supplied.
  User.findOne({ email: email }, {email: 1}, (err,foundUser)=>{
    //if system error
    if(err){
      next(err);
      return;
    }

    //if username is already taken
    if (foundUser){
      res.render('auth/create-tech-login', {
        errorMessage: 'The username already exists.'
      });
      return;
    }

    //If username does not exits, continue with user creation.
    //Generate encryptedPassword
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username,
      encryptedPassword: hashPass
    });

    theUser.save((err)=>{
      if(err){
        res.status(500).json({message: 'Something went wrong.'});
        return;
      }

      req.login(theUser, (err)=>{
        if(err){
          res.status(500).json({ message: 'Something went wrong.'});
          return;
        }
        res.status(200).json(req.user);
      });
    });
  });
});

//---------------- LOGIN ROUTE ----------------------
//Stays the same
// authRoutes.get('/login', (req,res,next)=>{
//   res.render('auth/login-view.ejs', {errorMessage: req.flash('error')});
// });
authRoutes.get('/login', (req,res,next)=>{
  res.render('auth/login', {errorMessage: req.flash('error')});
});

//changes..says that the authentication is done by passport and its using the
//local strategy
authRoutes.post("/login",
 passport.authenticate("local", {
  successReturnToOrRedirect: "/dashboard", //instead of successRedirect (which takes you to home no matter where you were).. successReturnToOrRedirect takes you to the last page you were on.
  failureRedirect: "/login",
  failureFlash: true, //get flash messages from login fail.
  successFlash: 'You have been logged in, user', //get flash messages from login success
  passReqToCallback: true
}));

//Get route for logout
//simply destroys the session
//does not destroy the cookie
//it clears all the information associated with the session (ie. currentUser)
authRoutes.get('/logout',(req,res,next)=>{
  req.logout(); //Instead of destroy().. it now works for all different strategies (google,facebook,etc.)
  req.flash('success', 'You have logged out.');
    res.redirect('/');
});

authRoutes.get('/dashboard', (req, res, next)=>{
  res.render('/dashboard/dashboard');
});

authRoutes.get('/loggedin', (req,res,next)=>{
  //Every single thing thar requires logged in, has to have this statement (below)
  if(!req.isAuthenticated()){
    res.status(200).json(req.user);
    return;
  }
  res.status(401).json({ message: 'Unathorized.'});
});

function ifNotLogged( req, res, next){
  if(!req.isAuthenticated()){
    res.stauts(403).json({ message: 'FORBIDDEN.'});
    return;
  }

  next();
}

authRoutes.get('/private', ifNotLogged, (req, res, next)=>{
  res.json({ message: 'Todays lucky numnber is 777'});
});

module.exports = authRoutes;
