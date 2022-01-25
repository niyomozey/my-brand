import auth from '../middleware/auth'
import express from 'express'
import upload from '../config/BlogMulterConf';
import imageProcessor from '../middleware/blogImageProcessor.js'
import blogController from '../controllers/blogController'

const blogRouter = express.Router()
const app = express()

blogRouter.get('/blogs',blogController.getAll)
blogRouter.get('/blog/:id',blogController.findBlogById)
blogRouter.delete('/deleteArticle/:id',auth,blogController.delete)
blogRouter.post('/createBlog',auth,upload.single('photo'),imageProcessor,blogController.createBlog)
blogRouter.patch('/updateArticle/:id',auth,upload.single('photo'),imageProcessor,blogController.update)

export default blogRouter;

