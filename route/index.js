var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');
var config = require('../config');
var verifyToken = require('../auth/verifyAuth');

module.exports = function (app, next) {
    app.get('/', function(req, res) {
        res.json({
            message: 'Token is valid. You can proceed.'
        });
      });

      /**
       * Function for authenticating and proving the user with jwt-token
       */
      app.post('/authenticate', function(req, res) {
          if (config.user === req.body.user && config.password === req.body.password) {
              var payload = req.body;
              var jwtToken = jwt.sign(payload, app.get('superSecret'), {
                expiresIn: '1m' // token validity set to 1 minute
              });

              res.json({
                  success: true,
                  message: 'Valid user',
                  token: jwtToken
              });
          } else {
              res.json({success: false, message: 'Error while authenticating user. Please provide valid credentials.'})
          }
      });

      /**
       * Function checking for received jwt-token and procedding when found valid
       */
      app.get('/checkvalid', verifyToken, function(req, res) {
        res.json({
            message: 'Token is valid. You can proceed.'
        });
      });
}