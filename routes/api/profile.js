//TODO: auth

const express = require("express")

const auth = require('../../middleware/auth.js')
const router = express.Router()

var mongoose = require('mongoose');
require('dotenv').config()

var UserModel = require('../../models/User.js')

function connectToDB() {
  //Set up mongoose connection
  var mongoDB = process.env.DB_URL;
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

}





connectToDB();

router.get("/", (req, res) => {

  
  
});

router.post("/",(req, res) => {

  //req.body.id 

  //


  res.status(200).send("Hello");

});





module.exports = router
