
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var alarmsSchema = new Schema(
{
    "gatewayID": {
      "type": "Date"
    },
    "nodeID": {
      "type": "Date"
    },
    "alarmTime": {
      "type": "String"
    },
    "userID": {
      "type": "String"
    },
    "value": {
      "type": "Number"
    },
    "action": {
      "type": "Number"
    },
    "extras": {
      "type": "String"
    }
  });
  //Export model
module.exports = mongoose.model('alarmsSchema', alarmsSchema);
