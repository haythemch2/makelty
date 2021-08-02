const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const Menuitem = require("../models/Menuitem");
const Restaurant = require('../models/Restaurant')
const { uuid } = require("uuidv4");
const Application = require("../models/Application");
const realtime = require('./../realTime');
const Mongoose = require("mongoose");


router.post("/createRestaurant", (req, res) => {
    Restaurant.create(req.body)
    .then((res) => res.json({ msg: "restaurant added" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add restaurant" })
    );
});

router.get("/getRestaurantOwners",(req,res)=>{
    User.find({accountType:'restaurant'}).then((users)=>{
        res.json(users)
    })
    .catch((err)=>res.status(400).json({err}))
})

router.put("/:restId",(req, res, next) => {
  Restaurant.findByIdAndUpdate(
    req.params.restId,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then(
      (rest) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(rest);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
})


class LoginSession {
    constructor(props) {
      this.id = uuid();
      this.userId = props.userId;
    }
    respond = (res) => {
      return res.json({ token: this.id, userId: this.userId });
    };
    save = (res) => {
      Session.create({ token: this.id, userId: this.userId });
    };
  }
  
  router.post("/addRestaurantOwner", async (req, res) => {
    try {
      console.log({ body: req.body });
      const user = await User.create(req.body);
      let session = new LoginSession({ userId: user._id });
      session.respond(res);
      session.save(res);
    } catch (e) {
      console.log(e);
      await res.status(400).json({ error: "Unable to add this user" });
    }
  });

router.get('/getDeliveryApplications',(req,res)=>{
  Application.find({})
  .then((applications)=>res.json(applications))
  .catch((err)=>res.status(400).json({err}))
})

router.post('/acceptDeliveryApplication',async(req,res)=>{
   await User.findByIdAndUpdate(req.body.userId,{accountType:'delivery'})
   Application.findByIdAndDelete(req.body.applicationId)
  .then((res)=>res.json({msg:'accepted'}))
  .catch((err)=>res.status(400).json({err}))
})

router.post('/declineDeliveryApplication',(req,res)=>{
  Application.findByIdAndDelete(req.body.applicationId)
  .then((res)=>res.json({msg:'declined'}))
  .catch((err)=>res.status(400).json({err}))
})


router.get("/getAllOrders",(req,res)=>{
  Order.find({}).then((orders)=>{
    res.json(orders)
  })
  .catch((err)=>{
    res.status(402).json({msg:'couldnt get all orders'})
  })
})

const connection = Mongoose.connection;
connection.on("open",()=>{

  const watchOrders= connection.collection("orders").watch();
  watchOrders.on('change',(newOrder)=>{
    if(newOrder.operationType=='insert'){
      if (newOrder.fullDocument.orderitems?.length)
      {
        realtime.emitEvent("newOrder",{},newOrder.fullDocument)
      }
    }
  })
    
})


module.exports = router;