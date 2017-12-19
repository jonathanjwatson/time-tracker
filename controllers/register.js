require("dotenv").config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');

setUserInfo = (req) => {
    return {
        _id: req._id,
        email: req.email,
    }
}

generateToken = (user) => {
    console.log(process.env.JWT_SECRET);
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 10080 //in seconds
    })
}


router.post('/', (req, res, next) => {
    console.log("Hit the register route")
    // const email = "test2@gmail.com";
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    // const password = "password";
    const password = req.body.password;

    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.'});
      }
    
      // Return error if full name not provided
    //   if (!firstName || !lastName) {
    //     return res.status(422).send({ error: 'You must enter your full name.'});
    //   }
    
      // Return error if no password provided
      if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' });
      }

      User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }
  
        // If user is not unique, return error
        if (existingUser) {
          return res.status(422).send({ error: 'That email address is already in use.' });
        }
        
        
        // If email is unique and password was provided, create account
        let user = new User({
          email: email,
          password: password,
          profile: { firstName: firstName, lastName: lastName }, 
        });
        let userInfo = setUserInfo(user);

        let token = generateToken(userInfo)
        user.token = token;
        console.log(user);
  
        user.save(function(err, user) {
          if (err) { return next(err); }
  
          // Subscribe member to Mailchimp list
          // mailchimp.subscribeToNewsletter(user.email);
  
          // Respond with JWT if user was created
  
          
  
          res.status(201).json({
            user: userInfo,
            token: user.token
          });
        });
    });
})

module.exports = router;