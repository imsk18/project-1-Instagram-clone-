const mongoose = require("mongoose")
const followSchema = new mongoose.Schema({
    follow:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"follow required"]
    },
    following:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"following required"]
    },
   
},
{ timestamps:true

}
)

const followModel = mongoose.model("follows",followSchema)

module.exports = followModel


