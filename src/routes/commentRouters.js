import express from 'express'
import commentController from '../controllers/commentController'


const commentRouter = express.Router()
const app = express()

commentRouter.post('/comment/:id',commentController.findCommentById)
commentRouter.get('/comments/:id', commentController.getAll)


export default commentRouter;

