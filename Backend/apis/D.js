const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const Menuitem = require("../models/Menuitem");
const Restaurant = require('../models/Restaurant');
const OrderItem = require("../models/OrderItem");
const Mongoose = require('Mongoose')

const realtime = require('./../realTime');


const connection = Mongoose.connection;
connection.on("open",()=>{

  const deliveryOrderWatch= connection.collection("orders").watch();
  deliveryOrderWatch.on('change',(newOrder)=>{
    console.log({newOrder});
    if(newOrder.operationType=='update'&& newOrder.fullDocument.confirmed==true){
      console.log({ newOrderFullDoc : newOrder.fullDocument});
      console.log('AAAAAAAAAAAAA HANY HNE');
      if (newOrder.fullDocument.orderitems?.length)
      {
        realtime.emitEvent("deliveryOrder",{},newOrder.fullDocument)
      }
    }
  })
    
})



module.exports = router;