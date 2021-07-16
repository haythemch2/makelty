const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem")
const Menuitem = require("../models/Menuitem");
const Restaurant = require("../models/Restaurant");
const Session = require("../models/Session");
const Application = require('../models/Application')
const { uuid } = require("uuidv4");




router.post("/pushorder", async(req, res) => {
  try{
    let newOrderData = { ...req.body};
    newOrderData.orderItems = Object.values(newOrderData.orderItems)
    let orderItemIds = []
    const order = new Order({
      ...newOrderData
    })
    const orderId = order._id
    for (let item of newOrderData.orderItems)
    {
      const {
        items,ready,confirmed,from,to 
      } = item
      const PItem = new OrderItem({
        items,ready,confirmed,from,to ,orderId
      })
     const saved =  await PItem.save()
     orderItemIds.push(saved._id)
    }
    console.log({orderItemIds});
    
    await order.orderitems.push(...orderItemIds)
    await order.save()
    return res.json({ msg: "Order added successfully" })
  }catch(e)
  {
   // ServerMonitor.catch(e)  TODO
  }
});
router.get("/getmenuitems", (req, res) => {
  Menuitem.find({})
    .then((menu) => res.json(menu))
    .catch((err) => {
      res.status(404).json({ norestaurantsfound: "No menuitems found" });
    });
});

router.get("/getrestaurants", (req, res) => {
  Restaurant.find({})
    .then((restaurants) => res.json(restaurants))
    .catch((err) => {
      res.status(404).json({ norestaurantsfound: "No restaurants found" });
    });
});

router.get("/getorderstate", (req, res) => {
  Order.findById(req.params.id)
    .then((order) => res.json(order))
    .catch((err) => {
      res.status(404).json({ norestaurantsfound: "No order found" });
    });
});


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

router.post("/userSignUp", async (req, res) => {
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

router.post("/userSignIn", (req, res) => {
  User.find({ phoneNumber: req.body.loginNumber }).then((user) => {
    Session.find({ userId: user[0]._id }).then((session) => {
      res.json({ session:session[0],user:user[0] });
      console.log({ session,user:user[0] })
    });
  }).catch(e=>{
    res.status(401).json({error :"bad credentials"}) 
  });
});


var fs = require('fs-extra');       //File System - for file manipulation
var md5 = require('md5');

router.post('/uploadId', async (req, res) => {
    req.pipe(req.busboy);
    let fields = {}
     req.busboy.on('field', function(key,value) {
         fields[key] = value
      });
    req.busboy.on('file', async (fieldname, file, filename) => {
        const re = /(?:\.([^.]+))?$/;
        const ext = re.exec(filename)[1];   
        let bytes = []
        file.on('data', function (chunck) {
            bytes = [...bytes, ...chunck]
        }).on('end', async () => {
                try {
                    const fileId = md5(bytes + [Date.now()]) 
                    const filename_ = fileId+ "." + ext
                    const file_path = __dirname + '/../uploads/' + filename_
                    fs.writeFileSync(file_path, new Buffer(bytes))
                    return res.json({fileId})
                }catch (e)
                {
                   return res.sendStatus(500)
                }
            })
    });
})

router.post('/deliveryApplication',(req,res)=>{
  console.log(req.body);
  Application.create(req.body)
  .then((res) => res.json({ msg: "applied" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to apply" })
    );
})


module.exports = router;
