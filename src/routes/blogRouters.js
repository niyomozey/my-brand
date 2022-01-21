import auth from '../middleware/auth'
import express from 'express'
import upload from '../config/multerConf';
import imageProcessor from '../middleware/blogImageProcessor.js'
import blogController from '../controllers/blogController'

const blogRouter = express.Router()
const app = express()

blogRouter.get('/blogs',blogController.getAll)
blogRouter.get('/blog/:id',blogController.findBlogById)
blogRouter.delete('/deleteArticle/:id',blogController.delete)
blogRouter.post('/createBlog',upload.single('photo'),imageProcessor,blogController.createBlog)
blogRouter.patch('/updateArticle/:id',upload.single('photo'),imageProcessor,blogController.update)

export default blogRouter;

