const express = require('express')
const postRouter = express.Router()
const postsController = require('../controllers/post.controller')


// api/posts
postRouter.post('/',postsController.createPostController)


module.exports = postRouter
