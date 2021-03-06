const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const dotenv       = require('dotenv');
const session      = require('express-session');
const passport     = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt       = require('bcrypt');
const flash        = require('connect-flash');
const User         = require('./models/user-model.js');
// allows different domains to access the API.
const cors         = require('cors');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Pristine Wireless - On Demand API';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

//---------------------- CORS -----------
app.use(cors());
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200', 'http://localhost:8000']
  }));
}



//----------------- For Passport (BEGIN) -----------------------
app.use(session({
  secret: 'angular auth passport secret shhhh',
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 }
  //httponly, can only access cookie through http
  //max makes is last longer
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// const passportSetup = require('./config/passport');
// passportSetup(passport);

app.use((req,res,next)=>{
  if (req.user){
    res.locals.user = req.user;
  }else {
    res.locals.user = null;
  }
  next();
});

//Local strategy - authentication is coming from internal check of records.
//By default the usernameField of the local strategy is set to 'username'
//By default the passwordField of the local strategy is set to 'password'
//If you want to check on anything else you need to over right the usernameField
//// by passing an object like below.
passport.use(new LocalStrategy({
  usernameField: 'email'
},(email, password, next)=>{
  //Check first if the database has an entry with that username.
  User.findOne({email}, (err, user)=>{
    if (err){
      return next(err);
    }
    //if user exits (fail) (authentication failed)-- (error message)
    else if(!user){
      return next(null, false, {message: "Incorrect email"});

    }
    else if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password"});
    }else{
      //Return the user that we found.
      next(null,user);
    }
  });

}));

//Takes the user id and deserialized it. Takes user id and returns the
//corresponding user object.
passport.serializeUser((user,cb)=>{
  cb(null,user._id);
});

passport.deserializeUser((id, cb)=>{
  User.findOne({"_id": id},(err,user)=>{
    if(err){
      return cb(err);
    }
    cb(null,user);
  });
});
//--------------- END PASSPORT -----------------------------------


//--------------- Routes Go Here ----------------------
const index = require('./routes/index');
const authRoutes = require('./routes/auth-routes');
const devicesApi = require('./routes/devices-api');
const techsApi = require('./routes/techs-api');
const customersApi = require('./routes/customers-api');
const repairDetailsApi = require('./routes/repair-detail-api');
const applyApi = require('./routes/application-api');
app.use('/', index);
app.use('/api', authRoutes);
app.use('/api', devicesApi);
app.use('/api', techsApi);
app.use('/api', customersApi);
app.use('/api', repairDetailsApi);
app.use('/api', applyApi);

//Middleware for redirect to angular index file.
app.use((req, res, next) => {
  res.sendfile(__dirname + '/public/index.html');
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
