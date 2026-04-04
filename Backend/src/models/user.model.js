const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exist"],
        required:[true,"username is required"],

    },
    email:{
        type:String,
        unique:[true,"eamil is already exist"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },

    bio:String,
     profileImg:{
        type:String,
        default:"https://ik.imagekit.io/r1xtcz1hu/default%20img.png"
     }
})

const userModel = mongoose.model('users',userSchema)
module.exports = userModel