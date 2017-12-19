require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();
const UsersController = require('./controllers/user');
const RegisterController = require('./controllers/register');
const APIController = require('./controllers/test');
const LoginController = require('./controllers/login');
const router = require('./router');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireLogin = passport.authenticate('local', { session: false});


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection;
connection.on('connected', () => {
  console.log('Mongoose Connected Successfully');    
}); 

// If the connection throws an error
connection.on('error', (err) => {  
  console.log('Mongoose default connection error: ' + err);
}); 

app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/auth/register', RegisterController);
app.use('/auth/login', requireLogin, LoginController);
app.use('/api', APIController);
app.use(function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
app.use(express.static(__dirname + '/client/build/'));
app.get('*', (req,res) => {
    res.sendFile(__dirname + '/client/build/index.html')
  })



// router(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Magic happening on port " + PORT);
})