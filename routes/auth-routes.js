const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const User  = require('../models/user-model');

const authRoutes = express.Router();

//Create Tech post route
authRoutes.post('/create-tech-login', (req, res, next)=>{
  const username = req.body.username;
  const password = req.body.password;

  //If user does not provide username or password
  if(!username || !password){
    res.status(400).json({ message: 'Provide username and password'});
    return;
  }

  //Search database with username that user has supplied.
  User.findOne({ username }, '_id', (err,foundUser)=>{
    //if system error
    if(err){
      res.status(500).json({ message: 'Something went wrong.'});
      return;
    }

    //if username is already taken
    if (foundUser){
      res.status(400).json({ message: 'The username already exists.'});
      return;
    }

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
authRoutes.post('/login', (req,res,next)=>{
  const passportFunction = passport.authenticate('local',
   (err, theUser, failureDetails)=>{
     if(err){
       res.status(500).json({ message: 'Something went wrong.'});
       return;
     }

     if(!theUser){
       res.status(401).json(failureDetails);
       return;
     }

     res.login(theUser,(err)=>{
       if(err){
         res.status(500).json({ message: 'Something went wrong'});
         return;
       }
       res.status(200).json(req.user);
     });
   });
   passportFunction(req,res,next);
});

//--------------- LOGOUT ROUTE -----------------------------
authRoutes.post('/logout',(req,res,next)=>{
  req.logout();
  res.status(200).json({ message: "sucess"});
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
  res,json({ message: 'Todays lucky numnber is 777'});
});

module.exports = authRoutes;
