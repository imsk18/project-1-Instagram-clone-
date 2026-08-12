const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserController(req,res){
    const followerUsername = req.user.username

    const followeeUsername = req.params.username

    let followRecord;

    if(followeeUsername === followerUsername){
        res.status(400).json({
            message:'you cannot follow yourself'
        })
    }

    const isFolloweeExits = await userModel.findOne({username: followeeUsername})
    if(!isFolloweeExits){
        return res.status(404).json({
            message:"user you are trying to follow does not exist"
        })
    }

    const isAlreadyFollow = await followModel.findOne({
       follow: followerUsername,
       followee: followeeUsername

    })

    if(isAlreadyFollow){
        res.status(200).json({
            message : `you have already following ${followeeUsername}`,
            follow: followRecord
        })
    }


    // const 

     followRecord = await followModel.create({
       follow: followerUsername,
        followee:followeeUsername
    })


    res.status(201).json({
        message:` you  are now  following  ${followeeUsername}`,
        follow:followRecord
    })

}


// async function unfollowUserController(req,res){
//      const followerUsername = req.user.username

//     const followeeUsername = req.params.username

//     const isUserFollowing = await followModel.findOne({
//        follower: followerUsername,
//        followee: followeeUsername
//     })

//     if(!isUserFollowing){
//         return res.status(400).json({
//             message:`you are not following ${followeeUsername}`
//         })
//     }

//     await followModel.findByIdAndDelete(isUserFollowing._id)
//     res.status(200).json({
//         message :`you have unfollow ${followeeUsername}`
//     })
// }
async function unfollowUserController(req, res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    console.log("Follower:", followerUsername)
    console.log("Followee:", followeeUsername)

    const isUserFollowing = await followModel.findOne({
        follow: followerUsername,
        followee: followeeUsername
    })

    console.log("Follow document:", isUserFollowing)

    if (!isUserFollowing) {
        return res.status(400).json({
            message: `you are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `you have unfollowed ${followeeUsername}`
    })
}


module.exports = {
    followUserController,
    unfollowUserController
}