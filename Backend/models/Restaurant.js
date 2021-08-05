const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
  },
  active: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 3,
  },
  reviews: {
    type: Number,
  },
  coordinatelatitude: {
    type: Number,
    required: true,
  },
  coordinatelongitude: {
    type: Number,
    required: true,
  },
  menu: {
    type: Array,
  },
  orders: {
    type: Array,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Restaurant = mongoose.model("restaurant", RestaurantSchema);
