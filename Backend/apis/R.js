const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const Menuitem = require("../models/Menuitem");
const Restaurant = require('../models/Restaurant');
const OrderItem = require("../models/OrderItem");
const Mongoose = require('Mongoose')

const realtime = require('./../realTime');

router.post("/confirmOrderItem", (req, res) => {
    OrderItem.findByIdAndUpdate(req.body.Id,{confirmed:true})
    .then((order) => res.json({ msg: "Order edited successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to edit this order" })
    );
});

router.post("/editmenuitem", (req, res) => {
    Menuitem.findByIdAndUpdate(req.params.menuItemId, req.body)
    .then((menuitem) => res.json({ msg: "menu item edited successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to edit this item" })
    );
});

router.post("/getorders", (req, res) => {
    OrderItem.find({from:req.body.restaurantId})
      .then((orders) => res.json(orders))
      .catch((err) => {
        res.status(404).json({ norestaurantsfound: "No orders found" });
      });
  });

router.post("/getMyRestaurant",(req,res)=>{
  Restaurant.findOne({owner:req.body.ownerId})
  .then((rest)=>{
    console.log(rest);
    res.json(rest)
  })
  .catch((err)=>{res.status(404).json({msg:"couldnt find owned restaurant"})
})
})  

router.post('/updateOrderItem',(req,res)=>{
   OrderItem.findByIdAndUpdate(req.body.orderItemId,req.body.updates)
  .then((item)=>{
    if (req.body.updates.confirmed)
    {
      Order.findById( item.orderId ).then((order)=>{
        let orderItemsCount = order.orderitems.length
         order.confirmedCount++
         if ( order.confirmedCount >= orderItemsCount ) // TODO : report bug when  order.confirmedCount > orderItemsCount
         {
           order.confirmed = true
           realtime.emitEvent("deliveryOrder",{},order)
           console.log("delivery order emiited hne ayy!!");
         }
         order.save()
       })
    }
  })
})


const connection = Mongoose.connection;
connection.on("open",()=>{

  const watchOrders= connection.collection("orderitems").watch();
  watchOrders.on('change',(newOrderItem)=>{
   if(newOrderItem.operationType=='insert'){
    if (newOrderItem.fullDocument.orderitems?.length)
    {
      realtime.emitEvent("newOrderItem",{},newOrderItem.fullDocument)
    }
   }
  })
    
})


module.exports = router;