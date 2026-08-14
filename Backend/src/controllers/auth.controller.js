const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

async function registerController (req, res)  {
    const {username, email, password,bio , profileImage} = req.body;

    // const isUserExistsByEmail= await userModel.findOne({email});
    // if(isUserExistsByEmail){
    //     return res.status(409).json({message:"User already exists with this email"})
    // }

    // const isUserExistsByUsername= await userModel.findOne({username});
    // if(isUserExistsByUsername){
    //     return res.status(409).json({message:"User already exists with this username"})
    // }

    const isUserExists = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
        })
        if(isUserExists){
            return res.status(409).json({
                message:"User already exists " + (isUserExists.email === email ? "with this email" : "with this username")
            })
        }
        // const hash = crypto.createHash("sha256").update(password).digest("hex");
        const hash = await bcrypt.hash(password,10)

        const user = await userModel.create({
            username,
            email,
            password:hash,  
            bio,
            profileImage
        })

        const token = jwt.sign({
            id:user._id,
            email:user.email,
            username:user.username
        },process.env.JWT_SECRET,{
            expiresIn:"1h"
        })

        res.cookie("token", token) 

        res.status(201).json({
            message:"User registered successfully",
            user:{
                username:user.username,
                email:user.email,
                bio:user.bio,
                profileImage:user.profileImage
            },
            token,
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

    // const hash = crypto.createHash('sha256').update(password).digest("hex")

    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        return res.status(409).json({
            message:"password invalid "
        })
        }

        token = jwt.sign({
            id:user._id,
            username:user.username
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


 async function getMeController(req,res){
    const userId = req.user.id
    const user = await userModel.findById(userId)
    res.status(200).json({
        message:"user get successfully !",
        user

    })
 }   



    module.exports = {
        registerController,
        loginController,
        getMeController
    }