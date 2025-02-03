const express= require("express");


const app= express();
 
const mongoosedb = require('./config/database');

const User = require("./model/user");
const { model } = require("mongoose");

const{ validatesignup }= require("./utiles/validation");

const bcrypt = require("bcrypt");
const cookiparser = require("cookie-parser");
const jwt = require("jsonwebtoken");


app.use(express.json());
app.use(cookiparser());

app.post("/signup", async (req,res)=>
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

        const {firstname , lastname , email, password} = req.body;

        const passswordhash = await bcrypt.hash(password,10);
        // const newuser = new User(req.body);
        const newuser = new User({
            firstname,
            lastname,
            email
            ,password:passswordhash,
        })
           await newuser.save();
           res.send("added succesfully");
    }
    catch(err){
        res.status(404).send("error is occured and why:" + err.message);
    }
})


//login api of the user

app.post("/login",async (req,res)=>
{
    try{
       
        const {email,password} = req.body;

        const user = await  User.findOne({email:email});

        if(!user)
        {
            res.send("invalid mail id");
        }
        const ispassword =  await bcrypt.compare(password,user.password)

        if(ispassword)
        {

            // creating the jwt token

            const jwttoken =  await jwt.sign({_id:user._id},"soham@44")//secret key
          //  console.log(jwttoken);

            // creating the cookie 
           res.cookie("token",jwttoken);
            res.send("login succefully");
        }
        else{
            res.send("password is incorrect");
        }
    }
    catch(err){
              res.send("error in this"+err.message)
    }
})

// creating the profile api 

app.get("/profile", async(req,res)=>
{
   try{
         const cookie = req.cookies;
         const {token} =cookie ;
       //  console.log(token);
         

         const  decoded = await  jwt.verify(token, 'soham@44');

          const {_id} = decoded;
         // console.log(_id)
         const user = await User.findById(_id);
         res.send(user);
         
   }
   catch(err)
   {
       res.status(404).send("ERROR"+err.message )
   }
})

// getting the all users from the database;

app.get("/user",async(req,res)=>
{
    const name = req.body.firstname;
    //console.log(name);
 
      try{
        const username = await User.find({firstname:name});
        if(username.length===0)
        {
            res.status(404).send("user not found");
        }
        else
        {
            res.send(username);
        }
      }
       catch{
        res.status(400).send("somthing went wrong");
       }
})

// getting all the documents from the database;

app.get("/feed", async(req,res)=>
{
     try
     {
        const data = await User.find({});
        res.send(data);
     }
     catch{
         res.status(404).send("somthing went wrong");
     }
})

// findin the only one

app.get("/find",async (req,res)=>

{
     const username = req.body.firstname;
    try{
          const finder = await User.findOne({firstname:username});
          res.send(finder);
    }
    catch{
        res.status(400).send("wrong.......")
    }
})

//delete the user from the database

app.delete("/del", async (req,res)=>
{
    const deldata= req.body.userId;

    try
    {
      const deleteddata = await User.findByIdAndDelete({_id:deldata});
      res.send("deleted succesfully");
    }
    catch
    {
        res.status(400).send("not deleted yet.......")
    }
})

//updatting the document in the database;

app.patch("/update",async(req,res)=>
{
    const userId= req.body.userId;
    const data = req.body;

    try{
         const dataup = await User.findByIdAndUpdate(userId,data);
         res.send("updated succesfully");    

    }
    catch{
        res.status(400).send("not updated  yet.......");
    }
})

mongoosedb()
.then(()=>
{
    console.log("connection is succesful");
    app.listen(2000,()=>
    {
        console.log("server is created succesfully");
    })
})
.catch((err)=>
{
    console.error("there is an error");
})












// const {mid} = require("./middelwares/auth");
 
// app.use("/user",mid)

// app.get("/user/data",mid,(req,res)=>
// {
//     res.send("the data is givne");
// });

// app.get("/user/login",(req,res)=>
// {
//     res.send("login succesfully");
// });

// app.use("/home",(req,res)=>
// { 
//     res.send("this is the home page");
// })

// app.use("/cart",(req,res)=>
// {
//     res.send("this is the cart page vikcyycycucytuci");
// })


// app.post("/home",(req,res)=>
// {
//     res.send("data is deleted");
// })

// app.delete("/home",(req,res)=>
//     {
//         res.send("data is saved");
//     })

// app.listen(2000,()=>
// {
//     console.log("server is listniing");
// });