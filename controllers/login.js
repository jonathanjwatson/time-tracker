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

router.post('/', (req, res, next) => {
    console.log("Hit the login route")
    let userInfo = setUserInfo(req.user);
    
      res.status(200).json({
        user: userInfo,
        token: generateToken(userInfo)
      });
});

module.exports = router;