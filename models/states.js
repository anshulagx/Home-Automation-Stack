
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
    "value": {
      "type": "Number"
    },
    "action": {
      "type": "String"
    },
    "extras": {
      "type": "String"
    }
  });
  //Export model
module.exports = mongoose.model('StatesSchema', statesSchema);
