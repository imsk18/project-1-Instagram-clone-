const postModel = require('../models/post.model')
const likeModel = require('../models/like.model')
const ImageKit = require("@imagekit/nodejs");
const {toFile} = require('@imagekit/nodejs');
const { Folders } = require('@imagekit/nodejs/resources/index.js');
const jwt = require('jsonwebtoken')


const imageKit = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY

})

 async function createPostController(req,res){
    // const {caption,imgUrl}
    console.log(req.body, req.file);

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),"file"),
        fileName: "image",
        folder: "instagram-clone" //for collect all files in a specific folder

    })
    res.send(file)

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl: file.url,
        user: req.user.id


    })

    res.status(201).json({
        message:"post create successfully !",
        post
    })
    

}


async function getPostController(req,res){
   
     const userId = req.user.id
    const post = await postModel.find({
       user: userId

    })

    res.status(200).json({
        message:"post fetched successfully",
        post
    })
    // console.log(decoded.id);
    
}


async function getPostDetailsController(req,res){
  

     const userId = req.user.id
     const postId = req.params.postId
     console.log(postId);
     

     const post = await postModel.findById(postId)

     if(!post){
        return res.status(404).json({message:"post not found"})
     }

     const isValidUser = post.user.toString() === userId

     if(!isValidUser){
        return res.status(403).json({
            message:"forbidden"
        })
     }

     res.status(200).json({
        message:"post details fetched successfully",
        post
     })


}


async function postLikeController(req,res){
    const username = req.user.username
    const postId = req.params.postId

    //checking post exist or not
    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found !"
        })
    }
    const like = await likeModel.create({
        post: postId,
       user: username
      
    })
    res.status(200).json({
        message:"like successfully ",
        like
    })


}


async function getFeedController(req, res) {
    const user = req.user

    const posts = await Promise.all(
        (await (await postModel.find({}).sort({_id: -1}).populate("user").lean()))
            .map(async (post) => {

                const isLiked = await likeModel.findOne({
                    user: user.username,
                    post: post._id
                })

                post.isLiked = Boolean(isLiked)

                return post
            })
    )

    res.status(200).json({
        message: "posts fetched successfully",
        posts
    })
}



module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    postLikeController,
   getFeedController
    


}