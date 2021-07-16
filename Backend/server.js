const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors')
const User = require('./apis/C')
const Admin = require('./apis/A')
const Restaurant = require('./apis/R')
const Delivery = require('./apis/D')
var busboy = require('connect-busboy');
const { Socket } = require("dgram");

mongoose.connect("mongodb://localhost:27017/alpha01",{useNewUrlParse:true,useUnifiedTopology:true});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("database connection has been established !");
});

const app = express();

//app.use(morgan('dev'))
// app.use(bodyParser.urlencoded({extended:true}))
//app.use(bodyParser.json())

app.use(cors({ origin: true,}));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(express.raw()); 

app.use(busboy());
// Init Middleware
app.use(express.static('uploads'))

// use Routes
app.use('/C', User);

app.use('/A', Admin);

app.use('/R',Restaurant)

app.use('/D',Delivery)

const PORT = process.env.PORT || 3001



var http = require('http').Server(app);

const realtime = require("./realTime")
realtime.Init(http)
http.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})


