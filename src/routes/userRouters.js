import verifyUser from '../middleware/verifyUser';
import auth from '../middleware/auth'
import express from 'express'
import Blog from '../models/blog';
import upload from '../config/UserMulterConf';
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
userRouter.post('/signup',auth,upload.single('avatar'),[verifyUser.checkDuplicateEmail],imageProcessor, userController.signup)
userRouter.put('/update/:id',auth,upload.single('avatar'),imageProcessor, userController.update)
userRouter.post('/changeppic/:id',auth,upload.single('avatar'),imageProcessor, userController.updateProfilePicture)
userRouter.get('/profile',auth,userController.profile)
userRouter.get('/delete/:id',auth,userController.delete)
export default userRouter;

