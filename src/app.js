import express from 'express';
import userRouter from './routes/userRouters';
import blogRouter from './routes/blogRouters';
import commentRouter from './routes/commentRouters';
import contactRouter from './routes/contactRouters';

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import db from './db/con.js'
import cors from 'cors'
const app = express()


app.use(express.json());
app.use('/uploads',express.static('./uploads/blogImages/'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*')
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept'
// 	)
// 	next()
// })
app.use(bodyParser.json());
app.use('/niyo',userRouter);
app.use('/niyo',blogRouter);
app.use('/niyo',commentRouter);
app.use('/niyo',contactRouter);


export default app

