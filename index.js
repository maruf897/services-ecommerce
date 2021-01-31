const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const ejs = require('ejs')
const usersDb = require("./db/userDb")
const passport = require('passport');
const userRoutes = require('./routes/userRoute')
const serviceRoutes = require('./routes/serviceRoutes')
const Service = require("./schemas/serviceSchema");
const session = require('express-session');

const hostname = "localhost";
const port = 3000;

const app = express();
app.set('view-engine', 'ejs')
require('./config/passport')(passport);

usersDb();
app.use(bodyParser.urlencoded({ extended: true }),);
app.use(bodyParser.json());
app.use(express.static(__dirname + "/views"))
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.set('view-engine', 'ejs')
app.get("/", (req,res)=>{
  
  Service.find({},(err,doc)=>{
    console.log(doc)
    let loggedin = false
    if(req.user){
      loggedin = true
    }
    res.render('index.ejs',{
      services: doc,
      loggedin: loggedin
      
    })
  })
  
})
app.use("/users", userRoutes);
app.use("/service", serviceRoutes);


const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log("running");
});