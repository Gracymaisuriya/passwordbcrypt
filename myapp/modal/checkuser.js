const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema({
   name:String,
   email:String,
   password:String
  });
  const checkusers = mongoose.model("users", user);
  module.exports = checkusers;