const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  timeStamp:{
      type:Date,
      default: Date.now
  },
  token:{
      type:String
  },
  userId:{
    type:mongoose.Schema.ObjectId
  },
  loggedIn:{
    type:Boolean,
    default:true
  }
});

module.exports = Session = mongoose.model("Session", SessionSchema);
