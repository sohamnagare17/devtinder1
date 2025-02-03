 const validate = require("validator");

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

module.exports={
    validatesignup
}