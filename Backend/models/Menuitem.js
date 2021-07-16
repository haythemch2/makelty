const mongoose = require("mongoose");

const MenuitemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = Menuitem = mongoose.model("menuitem", MenuitemSchema);
