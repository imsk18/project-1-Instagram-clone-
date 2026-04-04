const userModel = require("../models/user.model")
// const crypto = require("crypto")
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')

// POST:api/auth/register
async function registerController (req,res){
    const{username , email,password,bio,profileImg} = req.body

    // const isUserAlreadyExistByEmail = await userModel.findOne(email);
    // if(isUserAlreadyExistByEmail){
    //   return  res.status(409).json({
    //         message:"user is already exist same eamil"
    //     })
    // }

    // const isUserAlreadyExistByUsername = await userModel.findOne(username);
    // if(isUserAlreadyExistByUsername){
    //   return  res.status(409).json({
    //         message:"user is already exist same username"
    //     })
    // }

    // ek bar me hi dono check


    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"user is already exist" + (isUserAlreadyExist.email == email ? "email is already exist " : "username is already exist")
        })
    }

    // password hash

    // const hash = crypto.createHash('sha256').update(password).digest('hex')  //easily can access
    const hash = await bcrypt.hash(password,10)

    // now user create
    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImg
    })


    // token create

    const token = jwt.sign(
        {
        id:user._id
    },
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)
res.cookie('token',token)

res.status(201).json({
    message:"register success",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profileImg:user.profileImg
        
    }
})





}

// POST:api/auth/login
 async function loginController (req,res){
    const {username,email,password} = req.body

  const user = await userModel.findOne({
    $or:[
        {username:username},
        {email:email}
    ]
  })

  if(!user){
    return res.status(404).json({
        message:"user not found"
    })
  }

//   const hash = crypto.createHash('sha256').update(password).digest('hex')

//   const isPasswordValid = hash == user.password

const isPasswordValid = await bcrypt.compare(password,user.password)
  if(!isPasswordValid){
    return res.status(404).json({
        message:"invalid password"

    })
  }

  const token = jwt.sign(
   {id:user._id},
   process.env.JWT_SECRET,
   {expiresIn:"1d"}
)
res.cookie("token",token)
res.status(200).json({
    message:"login successfully",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profileImg:user.profileImg

    }
})

}


module.exports = {
    registerController,
    loginController
}
