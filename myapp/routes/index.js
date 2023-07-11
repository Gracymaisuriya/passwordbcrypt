var express = require('express');
var router = express.Router();
const checkusers = require('../modal/checkuser');
const bcrypt=require("bcrypt");
router.post('/createuser', async function(req, res, next) {
  req.body.password = await bcrypt.hash( req.body.password, 10)
   await checkusers.create(req.body)
   try {
    res.status(201).json({
      message: "User created successfully"
    })
   } catch (error) {
      res.status(404).json({
        message:"error"
      })
   }
});
router.post('/userverified', async function(req, res, next){
  const user = await checkusers.findOne({name:req.body.name})
  console.log(user)
  const checkpass = await bcrypt.compare(req.body.password,user.password)
  if(checkpass){
    console.log("user is verified person")
    res.status(201).json({
      message:"User Verified",
      data:user
    })
  }
  else{
    res.status(404).json({
      message:"User is not Verified",
    })
  }
})
module.exports = router;