const mongoose = require("mongoose")
const followSchema = new mongoose.Schema({
    follow:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"user",
        // required:[true,"follow required"]
        type:String
    },
    followee:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"user",
        // required:[true,"following required"]
        type:String
    },

    status:{
        type:String,
        default:"pending",
        enum:{
            values:["pending","accepted","rejected"],
            message:"status only can be pending, accepted or rejected"
        }
    }
   
},
{ timestamps:true

}

)
followSchema.index({follower:1 , followee:1 },{unique:true})
const followModel = mongoose.model("follows",followSchema)

module.exports = followModel


