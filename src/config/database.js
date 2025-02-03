const mongoose = require('mongoose');
// 4hvw9Sba6BLGe6c8
//K8IB17W0HVsY9xDM

const connectdb = async ()=>
{
     //await mongoose.connect("mongodb+srv://nagaresoham7:4hvw9Sba6BLGe6c8@namstedev1.yavxf.mongodb.net/soham");
     await mongoose.connect("mongodb+srv://nagaresoham7:K8IB17W0HVsY9xDM@cluster1.mrkxd.mongodb.net/sohamnew");
     
     

     
}

module.exports = connectdb;