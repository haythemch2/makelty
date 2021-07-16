const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  userPhoneNumber: {
    type: String,
  },
  userDescription: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
  },
  frontIdImg: {
    type: String,
  },
  backIdImg: {
    type: String,
  },
});

module.exports = Application = mongoose.model("application", ApplicationSchema);
