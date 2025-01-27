const mid = (req,res,next)=>
    {
        const auth="xyz";
        const valid = auth==="xyzw";
        if(valid)
        {
           console.log("auth is succesfully");
            next();
        }
        else{
            res.status(401).send("its not right");
        }
    }

    module.exports={mid};