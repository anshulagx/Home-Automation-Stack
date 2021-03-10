var mongoose = require('mongoose');
const express = require("express")
var mqtt = require('mqtt')
require('dotenv').config()


//var UserModel = require('../../models/alarms.js')
var StatesModel = require('../../models/states.js')


var options = {
  port: 1883,
  host: 'mqtt://65.1.164.121',
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: 'teamrookie',
  password: 'benrowonahack',
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clean: true,
  encoding: 'utf8'
};


var client = mqtt.connect('mqtt://65.1.164.121', options);
client.on('connect', function() { // When connected
    console.log('connected');
    // subscribe to a topic
    client.subscribe('testnode/publish', function() {
        // when a message arrives, do something with it
        client.on('message', function(topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
        });
    });
  });

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

//connectToDB();
const router = express.Router()

function write(){
   //send html webpage
   let data={
    "gatewayID":"62",
   "nodeID":"65",
     "userID":"akjsuhb",
      "value":52,
       "action":6,
        "extras":"" 
  };

  var state = new StatesModel(data);

  state.save(function(err, obj) {
    console.log("av");
    if (err) {
      console.log("Failed");
      return res.status(500).send(err);
    }
    console.log("Added");
    return res.status(200).send(obj);
  });
}

router.get("/", (req, res) => {

  //write();
  
  res.status(200).send(req.query.node);
});

router.post("/",(req, res) => {

  // {
  //   "gateway":2,
  //   "id":4,
  //   "action":"on",
  //   "extras":"adfs",
  //   "value":20
  // }
  console.log(req.body);
  if(req.body.id == 1){
    console.log("reached");
    var client  = mqtt.connect('mqtt://65.1.164.121',options)
    client.on('connect', function() {
      console.log('connected');
      client.publish('testnode/action', 'switchON', function() {
        console.log("ON Request Sent");
        client.end();
      });
    });
  }
  //req.body.id 

  //


  res.status(200).send("Hello");

});





module.exports = router
