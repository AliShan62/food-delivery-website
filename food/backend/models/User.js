const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
     required:true,
    
  },
  email: {
    type: String,
     required:true,
     unique: true,
  },
  password: {
    type: String,
    required:true,
    select:true,
  },
 location:{
   type:String,
   required:true
 },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});


module.exports = mongoose.model("User", userSchema);