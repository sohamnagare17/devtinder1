const express = require("express");
const { userauth } = require("../middelwares/auth");
const userrouter = express.Router();
const Connectionrequest = require("../model/connectionrequest");
const { set } = require("mongoose");
const User = require("../model/user");

userrouter.get("/user/request/review",userauth,async(req,res)=>
{
    try{
        const loggedinuser = req.user;
        //console.log(loggedinuser._id);
        //creating the instance
        const connectionstatus = await Connectionrequest.find({
             touserId:loggedinuser._id,
             status:"interested"
        }).populate("fromuserId","firstname lastname address");
        //console.log(connectionstatus);

       res.json({message:"the documenst are",connectionstatus})
    }
    catch(err)
    {
        res.send(err);
    }


})

userrouter.get("/user/request/received",userauth,async (req,res)=>
{
    try{
          const loggedin = req.user;
          const userrequest = await Connectionrequest.find({
            $or:[
                {touserId:loggedin._id},{fromuserId:loggedin._id}
            ],status:"accepted"
          }).populate("fromuserId","firstname lastname")
            .populate("touserId","firstname lastname");
          ///  console.log(userrequest);
          
          const data = userrequest.map((ele)=>
        {
            if(ele.fromuserId._id.toString()===loggedin._id.toString())
            {
                return ele.touserId;
            }
             return ele.fromuserId;
        });
        console.log(data);
          res.json({message:"the request are", data});


    }
    catch(err){
           res.status(400).json("somthing went wrong");
    }
})

userrouter.get("/feed",userauth,async(req,res)=>
{
  try{
       const loggedin = req.user;

       const connectionreq = await Connectionrequest.find({
        $or:[
          {fromuserId:loggedin._id},{touserId:loggedin._id}
        ]
       }).select("fromuserId touserId");//comma is main here
      // console.log(connectionreq);

       const hideuser =  new Set();

       connectionreq.forEach((ele) => {
        hideuser.add(ele.fromuserId.toString());
        hideuser.add(ele.touserId.toString());
       });
      //console.log(hideuser);

      const feeduser = await User.find({
        $and:[  {_id:{$nin:Array.from(hideuser)}} ,{_id:{$ne:loggedin._id}}]
      }).select("firstname lastname  photourl")
      res.send(feeduser);

  }
  catch(err)
  {
      res.send(err.message)
  }
})
module.exports= userrouter;
