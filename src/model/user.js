const mongoose = require('mongoose');
var validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



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

    },
    photourl:
    {
        type:String,
        default:"https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFraW5nJTIwcGhvdG98ZW58MHx8MHx8fDA%3D"
    }


});

userschema.methods.getJWT =  async function(req,res)
{
    const user = this;
    const token = await jwt.sign({_id:user._id},"soham@44");
    return token;
} 

userschema.methods.getvalidate = async function(password) 
{
     const user = this;
    // const { password}= req.body;
    // console.log(password);
    const pass = await bcrypt.compare(password,user.password);
    return pass;
}

module.exports=  mongoose.model("usermodel",userschema);