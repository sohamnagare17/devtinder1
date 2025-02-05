const mongoose = require("mongoose");
const user = require("../model/user");
const connectionrequestschema = new mongoose.Schema(
    {
        fromuserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:user,
        },
        touserId:
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        status:
        {
            type:String,
            required:true,
            enum:{
                values:["interested","ignore","accepted","rejected"],
                message:"`${VALUE}` is not valid",
            }
        }

    },
    {
        timestamps:true,
    }
);
connectionrequestschema.pre("save",function(next)
{
    const user = this;
    if(user.fromuserId.equals(user.touserId))
    {
       throw new Error("not possible")
    }
    next()
})

const Connectionrequest = new mongoose.model("Connectionrequest",connectionrequestschema );
module.exports = Connectionrequest;