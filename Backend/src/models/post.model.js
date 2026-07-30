const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,"img_url required for creating an post"]
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"user id required for creating post"]
    }
})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel