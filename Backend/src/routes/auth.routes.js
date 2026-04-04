const express = require("express")
const authController = require('../controllers/auth.controller')

const AuthRouter = express.Router()

// Post api
// api/auth/register
AuthRouter.post('/register',authController.registerController )

// api/auth/login

AuthRouter.post("/login", authController.loginController)
module.exports= AuthRouter