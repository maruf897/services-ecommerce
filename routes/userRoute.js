const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");
const Service = require("../schemas/serviceSchema");
const passport = require('passport')
const bcrypt = require("bcrypt");

const {ensureAuthenticated, forwardAuthenticated,modAuthenticated} = require('../config/auth')

// user get
router.get("/register",forwardAuthenticated, async (req, res,next) => {
  let loggedin=false
  if(req.user){
    loggedin = true
  }
  res.render('signup.ejs',{
    user: req.user,
    loggedin:loggedin
  })
})
router.post("/register", async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
      const newUser = new User({ ...req.body, password: hashedPass });
      const createdUser = await newUser.save();
      res.redirect('/')
    }
    res.json({ message: "user Exists" });
  } catch (error) {
    res.json(error.errors);
  }
});
router.get('/login',forwardAuthenticated, (req,res)=>{
  let loggedin=false
  if(req.user){
    loggedin = true
  }
  res.render('login.ejs',{
    user: req.user,
    loggedin:loggedin
  })
})
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    
  })
  
  (req, res, next);
});
router.get('/dashboard', modAuthenticated, (req,res)=>{
  let loggedin=false
  if(req.user){
    loggedin = true
  }
  Service.find({owner: req.user._id},(err,services)=>{
    
    res.render('dashboard.ejs',{
      user: req.user,
      services: services,
      loggedin:loggedin
    })
  })
  

  
})
router.get('/logout', (req, res) => {
  req.logout();
  //req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;