import express from 'express'
import bodyParser from 'body-parser'
const router = express.Router()
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const urlencodedparser = bodyParser.urlencoded({ extended: false });

router.get('/home',(req, res)=>{
    res.send('Landing Page....')
})
router.post('/login',urlencodedparser,(req,res)=>{
    const data = req.body;
    console.log('parsed data : ',data)
    res.send({message: "user login successfully",data})
})
router.post('/signup',urlencodedparser,(req, res)=>{
    const data = req.body;
    console.log('parsed data : ',data)
    res.send({message : "user signed successfully",data})
})
router.post('/contact',(req, res)=>{

})
router.get('/blog',(req,res)=>{

})

export default router;

