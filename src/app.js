const express= require("express");

const app= express();

app.use("/home",(req,res)=>
{
    res.send("this is the home page");
})

app.use("/cart",(req,res)=>
{
    res.send("this is the cart page vikcyycycucytuci");
})

app.listen(2000,()=>
{
    console.log("server is listniing");
});