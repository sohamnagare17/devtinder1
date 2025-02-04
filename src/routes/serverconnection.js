const express = require("express");
const connectionrouter = express.Router();
const {userauth} = require("../middelwares/auth");


connectionrouter.post("/sendconnection",userauth,async(req,res)=>
    {
        const user = req.user;
        res.send(user.firstname+"sent a connection request");
    });

    module.exports = connectionrouter;