 const validate = require("validator");
 const User = require("../model/user")

const validatesignup = (req)=>
{
  const {firstname,lastname,email,} = req.body;
  
  if(!firstname || !lastname)
  {
     throw new Error(" invalid names");
  }
  else if(firstname.length <4 || firstname.length >50)
  {
    throw new Error("name lenght is not valid");
  }
  else if(!validate.isEmail(email))
  {
     throw new Error("email is not valid");
  }
}

const validateeditdata = (req) =>
{
    const allowfield = ["firstname","lastname","age","photourl"];

   const isalloed= Object.keys(req.body).every(ele => allowfield.includes(ele));
   return isalloed;
  
}

//  const validatePassword = async (req) => {
//   try {
//      const { email } = req.body; 

//     const isUser = await User.findOne({email });

//     if (!isUser) {
//       return false;
//     } else {
//       return true;
//     }
//  }
//   catch (error) {
//      console.error("Database error:", error);
   
//   }
//  };


module.exports={
    validatesignup,validateeditdata
}