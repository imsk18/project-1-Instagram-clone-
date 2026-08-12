const express = require('express')
const postController = require('../controllers/post.controller')

const postRouter = express.Router()
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require('../middleware/auth.middleware')


postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController);

postRouter.get("/",identifyUser,postController.getPostController)
postRouter.get("/details/posts/:postId",identifyUser,postController.getPostDetailsController)

postRouter.post('/like/:postId', identifyUser,postController.postLikeController)




module.exports = postRouter