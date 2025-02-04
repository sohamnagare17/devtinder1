const express = require("express");
const profileroute = express.Router();

const {userauth} = require("../middelwares/auth");
profileroute.get("/profile",userauth, async (req,res)=>
    {
       try{
        console.log(req.user);
             const user = req.user;
             res.send(user);
             
       }
       catch(err)
       {
           res.status(404).send("ERROR"+err.message )
       }
    });
    module.exports = profileroute;