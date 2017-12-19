require("dotenv").config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../models/user');

// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router(); 

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

apiRoutes.use(function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token)
    console.log(process.env.JWT_SECRET);
    if (token) {

        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: 'Failed to authenticate token.', err: err });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: "No token provided."
        });
    }
})

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});   


module.exports = apiRoutes;