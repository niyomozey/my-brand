import verifyUser from '../middleware/verifyUser';
import auth from '../middleware/auth'
import express from 'express'
import Blog from '../models/blog';
import upload from '../config/multerConf';
import {pick} from 'lodash'
import userController from '../controllers/userController'
import imageProcessor from '../middleware/userImageProcessor'


const userRouter = express.Router()
const app = express()

userRouter.get('/home',(req, res)=>{
    res.send('Landing Page....')
})
userRouter.post('/login',userController.login)
userRouter.post('/logout',auth, userController.logout)
userRouter.post('/signup',upload.single('avatar'),[verifyUser.checkDuplicateEmail],imageProcessor, userController.signup)
userRouter.put('/update/:id',upload.single('avatar'),imageProcessor, userController.update)
userRouter.get('/profile',userController.profile)
userRouter.get('/delete/:id',userController.delete)
// userRouter.post('/signup',(req, res)=>{
//     console.log(req.body)
// })
export default userRouter;

