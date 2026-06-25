const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const crypto = require('crypto')



async function registerController (req, res){
    const{ username, email,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })

    if(!user){
        return res.status(401).json({
            message:"user not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest("hex")

    const isPasswordCorrect = hash == user.password
    if(!isPasswordCorrect){
        return res.status(409).json({
            message:"password invalid "
        })
        }

        token = jwt.sign({
            id:user._id
        },process.env.JWT_SECRET, {expiresIn:"1d"})

        res.cookie("token", token)

        res.status(200).json({
            message:"logged in successfully",
            user:{
                username:user.username,
                email:user.email,
                bio:user.bio,
                profileImage:user.profileImage
            }
        })




   
    

    }

async function loginController(req,res){
    const{ username, email,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })

    if(!user){
        return res.status(401).json({
            message:"user not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest("hex")

    const isPasswordCorrect = hash == user.password
    if(!isPasswordCorrect){
        return res.status(409).json({
            message:"password invalid "
        })
        }

        token = jwt.sign({
            id:user._id
        },process.env.JWT_SECRET, {expiresIn:"1d"})

        res.cookie("token", token)

        res.status(200).json({
            message:"logged in successfully",
            user:{
                username:user.username,
                email:user.email,
                bio:user.bio,
                profileImage:user.profileImage
            }
        })




   
    

    }

    module.exports = {
        registerController,
        loginController
    }