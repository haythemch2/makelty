const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  accountType:{
    type:String,
    default:'client'
  }
});

module.exports = User = mongoose.model("user", UserSchema);
