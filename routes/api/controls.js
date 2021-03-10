//TODO: auth

const express = require("express")
var mqtt = require('mqtt')
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
const router = express.Router()


router.get("/", (req, res) => {

  //send html webpage
  
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
