const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    age:
    {
        type:Number,
    },
    address:String,
    email:String,
    password:String,


});

module.exports=  mongoose.model("usermodel",userschema);