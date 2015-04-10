/********** Setup **********/

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var passport = require("passport");
var facebookStrategy = require("passport-facebook");
var morgan = require("morgan");

var app = express();

// configure
app.use(bodyParser.json()); // config for body parser
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev")); // logs all requests

/*********** End Setup **********/
/*********** Authentication **********/



/*********** End Authentication **********/
/*********** Database/Models **********/

// connect to mongodb
mongoose.connect('mongodb://localhost/youtubelive');

// set up connection
var db = mongoose.connection;

// check for connection error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Success! Database Connected!");
});

// Set up schema
var Schema = mongoose.Schema;

// user schema
var commentSchema = new Schema({
  userID:  String,
  videoID: Number,
  time:    Number,
  comment: String
});

// method for user schema
commentSchema.methods.toString = function () {
  return this;
}

// create User model
var Comment = mongoose.model('Comment', commentSchema);

/*********** End Database/Models **********/
/*********** Controllers **********/

// show one user
app.get("/", function (req, res) {
  console.log("Home");
  res.send("Home");
});

/*********** End Controllers **********/
/*********** Server **********/

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});

/*********** End Server **********/
