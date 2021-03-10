
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var statesSchema = new Schema(
{
    "gatewayID": {
      "type": "String"
    },
    "nodeID": {
      "type": "String"
    },
    "timestamp": {
      "type": "Date",
      "default": new Date()
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
module.exports = mongoose.model('StatesSchema', statesSchema);
