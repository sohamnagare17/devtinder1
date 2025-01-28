const mongoose = require('mongoose');
// 4hvw9Sba6BLGe6c8

const connectdb = async ()=>
{
     await mongoose.connect("mongodb+srv://nagaresoham7:4hvw9Sba6BLGe6c8@namstedev1.yavxf.mongodb.net/soham");
}

module.exports = connectdb;