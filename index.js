import express from 'express';
import userRouter from './src/route/user.js';
const app = express()

const port = 1111;
app.set('view engine','ejs')
app.use('/niyo',userRouter)
app.listen(port)
console.log(`Connected on ${port} port`)
