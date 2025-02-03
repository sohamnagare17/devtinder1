const mongoose = require('mongoose');
var validator = require('validator');



const userschema = new mongoose.Schema({
    firstname:{
        type:String,
        required: true,
    },
    lastname:{
        type:String,
        required: true,
    },
    age:
    {
        type:Number,
    },
    address:{
        type:String,
        
    },
   email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
     validate(value)
     {
        if(!validator.isEmail(value))
        {
            throw new Error("this is wrong email" , value);
        }
     }
       
   },
    password:
    {
        type:String,

    }


});

module.exports=  mongoose.model("usermodel",userschema);