const mongoose = require('mongoose')
const { applyTimestamps } = require('./follow.model')

const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
        required:[true,"post id is required for create like"]

    },
    user:{
        type:String,
        required:[true,"userid required to crate like"]
    }

   
},{Timestamps:true}
)

likeSchema.index({post:1,user:1},{unique:true})

const likeModel = mongoose.model("likes",likeSchema)

module.exports = likeModel