const express= require("express");


const app= express();
 
const mongoosedb = require('./config/database');

const User = require("./model/user");

app.post("/signup", async (req,res)=>
{
    const newuser =  new User({
     firstname:"soham",
     lastname:"nagare",
     email:"nagaresoham7@gamil.com",
     address:"ichalkaranji",
    })
    await newuser.save();
    res.send("added succesfully");
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