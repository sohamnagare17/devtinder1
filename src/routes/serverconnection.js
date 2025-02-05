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
              if(!isrequest)
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

    module.exports = connectionrouter;