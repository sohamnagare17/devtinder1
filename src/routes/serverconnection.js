const express = require("express");
const connectionrouter = express.Router();
const {userauth} = require("../middelwares/auth");
const Connectionrequest = require("../model/connectionrequest")
const User = require("../model/user");


connectionrouter.post("/request/sent/:status/:touserId",userauth,async(req,res)=>
    {
       
        try{
              const fromuserId= req.user._id;
              const touserId = req.params.touserId;
              const status = req.params.status;

              const newconnectionreq = new Connectionrequest({
                fromuserId,
                touserId,
                status,
              });
              console.log(fromuserId);

              const allowedstatus =["interested","rejected"];
              if(!allowedstatus.includes(status))
              {
                return res.status(400).json({message:"invalid status"+status
                })
              }
              //checking the userid is present in the database;
              const ispresent = await User.findById(touserId);
              if(!ispresent)
              {
                  res.status(404).send("invalid user id")
              }

              //cheking the request id same as the fromid
              //use pre method

              //checking the previous request

              const isrequest = await Connectionrequest.findOne({
                $or:[
                    {fromuserId,touserId},{fromuserId:touserId,touserId:fromuserId}
                ]
              })
              if(isrequest)
              {
                return res.status(404).send("can not send the request");
              }
              const data = await newconnectionreq.save();
             // res.send(data);
              res.json({
                message:"sent the request",
                data,
              })
        }
        catch(err)
        {
            res.send("ERROR"+err.message)
        }
    });

  connectionrouter.post("/request/review/:status/:requestId",userauth,async(req,res)=>
{
    //1 check the mmiddleware
    //2 check the status is valid or not
    //3 check the request id valid or not
    //4 check the touserid is same as the loggedin user
    //5 check the status of the instance is intrested always

    const loggedinuser = req.user;
    console.log(loggedinuser._id);

    const{status,requestId}= req.params;
     console.log(status);
     console.log(requestId);

    const allowedstatus = ["accepted","rejected"];
    if(!allowedstatus.includes(status))
    {
        res.status(400).send("invalid status");
    }

    const newuser = await Connectionrequest.findOne({
        fromuserId:requestId,
        touserId:loggedinuser._id,
        status:"interested"
    });
    console.log(newuser);
    if(!newuser)
    {
        res.status(404).json({
            message:"connection req is not found",
        })
    }
   newuser.status = status;

   const data= await newuser.save();
    res.json({
        message:"the request status" +status,data 
    })

})
    

    module.exports = connectionrouter;