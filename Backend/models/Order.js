const { json } = require("body-parser");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  ready: {
    type: Boolean,
  },
  confirmed: {
    type: Boolean,
  },
  note: {
    type: String,
  },
  from: {
    type: mongoose.Schema.ObjectId,
  },
  to: {
    type: mongoose.Schema.ObjectId,
  },
  orderitems: [{ type: mongoose.Schema.ObjectId, ref: "orderitem" }],
  confirmedCount: { type: Number, default: 0 },
  readyCount: { type: Number, default: 0 },
});

module.exports = Order = mongoose.model("order", OrderSchema);
