const express= require("express");

const authrouter = express.Router();
const User = require("../model/user");
const{ validatesignup }= require("../utiles/validation");
const bcrypt = require("bcrypt");
// const{ validatesignup }= require("../utiles/validation");

//sign up api
authrouter.post("/signup", async (req,res)=>
    {
        // const newuser =  new User({
        //  firstname:"soham",
        //  lastname:"nagare",
        //  email:"nagaresoham7@gamil.com",
        //  address:"ichalkaranji",
        // })
        // await newuser.save();
        //  res.send("added succesfully");
    
        // const newuser = new User(req.body);
    
        try{
            validatesignup(req);
    
            const {firstname , lastname , email, password,age,photourl} = req.body;
    
            const passswordhash = await bcrypt.hash(password,10);
            // const newuser = new User(req.body);
            const newuser = new User({
                firstname,
                lastname,
                email
                ,password:passswordhash,
                age,
                photourl,
            })
               await newuser.save();
               res.send("added succesfully");
        }
        catch(err){
            res.status(404).send("error is occured and why:" + err.message);
        }
    })

//login api
    authrouter.post("/login",async (req,res)=>
    {
        try{
           
            const {email,password} = req.body;
    
            const user = await  User.findOne({email});
          //  res.send(user);
    
            if(!user)
            {
                //  res.send("invalid mail id");
                return  res.send("invalid  email id");
                // throw new Error("invalid mail")
                 
            }
            const ispassword =  await user.getvalidate(password);
    
            if(!ispassword)
            {
              
                return res.send("invalid password");
            }
                // creating the jwt token
    
                const jwttoken =  await user.getJWT();//secret key
              
    
                // creating the cookie 
               res.cookie("token",jwttoken);
              res.send(user);
        
        }
        catch(err){
                  res.send("error in this"+err.message)
        }
    })


    // authrouter.post("/login", async (req, res) => {
    //     try {
    //         const { email, password } = req.body;
    
    //         const user = await User.findOne({ email: email });
    
    //         if (!user) {
    //             return res.status(400).send("Invalid email ID");  // ⬅️ Return stops execution
    //         }
    
    //         const isPasswordValid = await user.getvalidate(password);
    
    //         if (!isPasswordValid) {
    //             return res.status(400).send("Password is incorrect");  // ⬅️ Return stops execution
    //         }
    
    //         const jwttoken = await user.getJWT();
    //         res.cookie("token", jwttoken);
    //         return res.status(200).send("Login successful");  // ✅ No extra responses
    //     } catch (err) {
    //         return res.status(500).send("Error: " + err.message);  // ✅ Proper error handling
    //     }
    // });
    

// logout api

authrouter.post("/logout",async (req,res)=>
{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.send("logout succesfully");
})
module.exports = authrouter;