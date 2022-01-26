import express from 'express';
import userRouter from './routes/userRouters';
import blogRouter from './routes/blogRouters';
import commentRouter from './routes/commentRouters';
import contactRouter from './routes/contactRouters';

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import db from './db/con.js'
const app = express()


app.use(express.json());
app.use('../uploads',express.static('uploads/'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/niyo',userRouter);
app.use('/niyo',blogRouter);
app.use('/niyo',commentRouter);
app.use('/niyo',contactRouter);


export default app

