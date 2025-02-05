const mongoose = require("mongoose");
const connectionrequestschema = new mongoose.Schema(
    {
        fromuserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
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
                values:["intrested","ignore","accepted","rejected"],
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
       throw new Error("not possible");
    }
    next();
})

const Connectionrequest = new mongoose.model("Connectionrequest",connectionrequestschema );
module.exports = Connectionrequest;