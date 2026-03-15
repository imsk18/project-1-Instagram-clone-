const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username name already is exist"],
        required:[true,"user name is required"],


    },
    email:{
        type:String,
        unique:[true,"email is already exist"],
        required:[true,"email is required"],

    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:String,
    profileImg:{
        type:String,
        default:"https://ik.imagekit.io/t777kdux6/default%20img.png"
    }
    

})

const userModel = mongoose.model("users",userSchema)