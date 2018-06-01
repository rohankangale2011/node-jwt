var express = require("express");
var app = express();
var routes = require("./route");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var config = require("./config");

app.set("superSecret", config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers');
  next();
});

require("./route")(app);

app.listen(3001, function() {
  console.log("Listening on port 3001");
});

module.exports = app;
