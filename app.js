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

passport.use(new facebookStrategy({
    clientID: '1425278451107398',
    clientSecret: '14aa8f22785ea663c617acb593412114',
    callbackURL: "http://localhost:3000/"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({}, function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
  }
));


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

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

/*********** End Controllers **********/
/*********** Server **********/

var server = app.listen(3333, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});

/*********** End Server **********/
