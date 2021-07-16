const { json } = require("body-parser");
const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String },
      price: { type: Number },
      qt: { type: String },
      from: { type: mongoose.Schema.ObjectId },
      to: { type: mongoose.Schema.ObjectId },
      id: { type: String },
    },
  ],
  ready: {
    type: Boolean,
  },
  confirmed: {
    type: Boolean,
  },
  from:{ type: mongoose.Schema.ObjectId },
  to: { type: mongoose.Schema.ObjectId },
  orderId : {type:mongoose.Schema.ObjectId,ref:'order'}
});

module.exports = OrderItem = mongoose.model("orderitem", OrderItemSchema);