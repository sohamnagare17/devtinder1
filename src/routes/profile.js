const express = require("express");
const profileroute = express.Router();
const bcrypt = require("bcrypt");

const {userauth} = require("../middelwares/auth");
const { validateeditdata} = require("../utiles/validation");

const User = require("../model/user")
profileroute.get("/profile/view",userauth, async (req,res)=>
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

profileroute.patch("/profile/edit",userauth,async (req,res)=>
{
    try{
       // validateeditdata(req);
        if(!validateeditdata(req))
        {
            res.send("ediatable data is invalid");
        }
        else{
        // updating the data
             const edituser = req.user;
          Object.keys(req.body).forEach(ele=> (edituser[ele]=req.body[ele]));
          await edituser.save();

            res.send(edituser);
          
            res.send("data edit succefully");
        }
    }
    catch(err)
    {
       //throw new Error("this is "+ err.message);
       res.send("this is wrong");
    }
})

profileroute.patch("/password",userauth,async (req,res)=>
{
   try{

    const {email}= req.body;
    const user = await User.findOne({email});
    if(!user)
    {
        res.send("invalid emial");
    }
    else{
        const password = req.body.password;
        //console.log(user.password);
        const passswordhash = await bcrypt.hash(password,10);
    
        req.user.password = passswordhash;
        console.log("new password "+user.password);
        res.send("updated succesfully");
    }


        // if(validatePassword(req)){
        // const mainuser =req.user;
        // console.log(mainuser.password);
        // mainuser.password = req.body.password;
        // console.log(mainuser.password);
        // res.send(mainuser);
        // res.send("password is updated succesfully");
        //       }
        //       else{
        //         res.send("email is not valid");
        //       }
    
   }
   catch(err)
   {
     res.send("password is not updated")
   }
    
})
    module.exports = profileroute;