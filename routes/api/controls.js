var mongoose = require('mongoose');
const express = require("express")
var mqtt = require('mqtt')
require('dotenv').config()
var moment = require('moment')


//var UserModel = require('../../models/alarms.js')
var StatesModel = require('../../models/states.js');
const { request } = require('express');


var options = {
  port: process.env.MQTT_PORT,
  host: process.env.MQTT_HOST,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clean: true,
  encoding: 'utf8'
};

function mqttPub(topic, msg){
  var client  = mqtt.connect(process.env.MQTT_HOST,options)
    client.on('connect', function() {
      console.log('connected');
      client.publish(topic, msg, function() {
        console.log(topic+" : "+msg+" Published");
        client.end();
        return;
      });
  });
}

function mqttSub(gatewayID){
  var client = mqtt.connect(process.env.MQTT_HOST, options);
client.on('connect', function() {
    console.log('connected');
    client.subscribe(gatewayID, function() {
        // when a message arrives, do something with it
        client.on('message', function(topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
            console.log(typeof(message));
            let parse = message.toString().split("/");
            let nodeID = parse[0],action = parse[1],value=parse[2],extras=parse[3];
            mongoWrite(gatewayID, nodeID, action, value);
        });
    });
  });
}
//TODO: MAKE IT VARIABLE
mqttSub("2111");

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
const router = express.Router()

function mongoWrite(gatewayID, nodeID, action, value=0, extras=""){
   //send html webpage
   let data={
    "gatewayID":gatewayID,
    "nodeID":nodeID,
    "value":value,
    "action":action,
    "extras":extras,
    "timestamp":new Date()
  };

  var state = new StatesModel(data);

  StatesModel.updateOne({gatewayID: gatewayID,nodeID:nodeID}, data, {upsert: true},()=>{
    console.log("Write success");
  });
}

router.get("/publish", (req, res) => {
 
  console.log("Initiating Message Publish");
  mqttPub(req.query.gateway,req.query.node+"/"+req.query.action+"/"+req.query.value+"/"+req.query.extras)
  mongoWrite(req.query.gateway,req.query.node,req.query.action,req.query.value,req.query.extras);
  res.status(200).send("Success");
});

router.get("/alarm", (req,res) => {
  console.log("Setting Alarm");
  var now = moment();
  var alarmTime = moment(req.query.time.toString(), moment.HTML5_FMT.DATETIME_LOCAL);
  var time = parseInt(moment.duration(alarmTime.diff(now)).asSeconds())
  console.log(time)
  setTimeout(function () {
    mqttPub(req.query.gateway, req.query.node+'/'+req.query.action+'//');
  }, time*1000)
})
router.get("/lastAction", (req,res) => {
  StatesModel.find().sort({"timestamp": -1}).limit(1).exec((err, entry) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err)
    }
    return res.status(200).send(entry);
  });;
});

router.get("/read", (req,res) => {
  // gatewayID, nodeID

  var gatewayId=req.query.gatewayId;
  var nodeId=req.query.nodeId;
  
  StatesModel
  .find({
    gatewayID: gatewayId,
    nodeID:nodeId
  })
  .exec((err, entry) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err)
    }
    return res.status(200).send(entry[0]);
  });
});


module.exports = router