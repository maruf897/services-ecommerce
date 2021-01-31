const express = require("express");
const router = express.Router();
const passport = require('passport')
const {ensureAuthenticated, forwardAuthenticated,modAuthenticated} = require('../config/auth')
const Service = require("../schemas/serviceSchema");
const stringSimilarity = require("string-similarity");
// user get

  

router.get("/addservice",modAuthenticated, async (req, res,next) => {
  
  res.render('addservice.ejs',{
    user: req.user
  })
})
router.post("/addservice",modAuthenticated, async (req, res) => {
  try { 
    let newService = new Service(req.body) ;
    const createdService = await newService.save();
    res.status('200')

  } catch (error) {
    res.json(error.errors);
  }
});
router.get("/:id", async (req, res,next) => {
  Service.findById(req.params.id, function (err, service)  {
    let type="none"
    let loggedin= false
    if(req.user){
      type= req.user.usertype
      loggedin= true

    }
    res.render('service.ejs',{
        service:service,
        user: type,
        loggedin: loggedin

    })
})

})
router.get("/edit/:id",modAuthenticated, async (req, res,next) => {
  Service.findById(req.params.id, function (err, service)  {
    res.render('editservice.ejs',{
        service:service
    })
})

})
router.post("/edit/:id",modAuthenticated, async (req, res,next) => {
  
  await Service.replaceOne({_id: req.params.id},req.body)

})
router.get("/delete/:id",modAuthenticated, async (req, res,next) => {
  await Service.deleteOne({_id: req.params.id})
  res.redirect("/users/dashboard")


})
router.post("/search", async (req,res)=>{
  console.log(req.body.key)
  
  Service.find({},async (err,doc)=>{
    let title = await doc.map((service)=>{return service.title})
     title = await doc.map((service)=>{return service.title[0]})
    console.log(title)
     let  matches = stringSimilarity.findBestMatch(req.body.key, title);
    console.log(matches)
    let names = new Array;
    matches.ratings.forEach((rating)=>{
      if(rating.rating >= 0.1){
        names.push(rating.target)
      }
    })
    console.log(names)
    let data = new Array
    doc.forEach((ds)=>{
      names.forEach((n)=>{
        if(ds.title[0]=== n){
          data.push(ds)
        }
      })
    });
    console.log(data)
    res.json(data)

    
    })
    
  })


module.exports = router;