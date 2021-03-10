var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    "userId":  { type: Number,
       required: true },
    "name": {
      "type": "String",
      default:"No name"
    },
    "selectedTopics": {
      "type": ["String"],
      default:[""]
    },
    "totalWatchTime": {
      "type": "Number",
      default:0
    },
    "videoWatched": {
      "type": [
        "Mixed"
      ]
    },
    "videoCount": {
      "type": "Number",
      default:0
    },
    "lastFiveCount":{
      "type":["Mixed"],
      "default":[]
    }
  });
//Export model
module.exports = mongoose.model('User', UserSchema);
