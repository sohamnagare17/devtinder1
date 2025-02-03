// const mid = (req,res,next)=>
//     {
//         const auth="xyz";
//         const valid = auth==="xyzw";
//         if(valid)
//         {
//            console.log("auth is succesfully");
//             next();
//         }
//         else{
//             res.status(401).send("its not right");
//         }
//     }

//     module.exports={mid};

const jwt = require("jsonwebtoken");
const User = require("../model/user")

const userauth = async  (req ,res , next)=>
{
  try{
    const {token} = req.cookies;
    if(!token)
    {
      throw new Error("invalid token");
    }
   
    const decodedata = await jwt.verify(token,"soham@44");
 
    const {_id} = decodedata;
 
    const user = await User.findById(_id);
    if(!user)
    {
      res.send("invalid user");
    }
     req.user = user;
     next();
    
  }
  catch(err)
  {
     res.status(404).send("EROOR")
  }

}

module.exports = {userauth
    ,
}; 