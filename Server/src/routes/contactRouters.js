import contactController from '../controllers/contactController'
import express from 'express'
import {pick} from 'lodash'


const contactRouter = express.Router()
const app = express()

contactRouter.post('/contactUs',contactController.sendEmail)

export default contactRouter;

