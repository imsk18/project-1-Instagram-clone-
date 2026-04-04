const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    caption:{
        Type:String,
        default:'',
   },
   imgUrl:{
    type:String,
    required:[true,"imgUrl is required for post creating"]
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:[true,"user id is required"]
   }

})

const postModel = mongoose.model("posts",postSchema)
module.exports = postModel