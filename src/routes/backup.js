import verifySignup from '../middleware/verifySignup';
import auth from '../middleware/auth'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import Comment from '../models/comment'
import blog from '../models/blog'
import user from '../models/user'
import express from 'express'
import Blog from '../models/blog';
import upload from '../config/multerConf';
import imageProcessor from '../middleware/blogImageProcessor.js'
import {pick} from 'lodash'


const router = express.Router()
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(express.json())
const urlencodedparser = bodyParser.urlencoded({ extended: false });

router.get('/home',(req, res)=>{
    res.send('Landing Page....')
})
router.post('/login',async (req,res, next)=>{
    const data = req.body;
    try {
        const User = await user.findByCredentials(data.email, data.password)
        const token = await User.generateAuthToken();
        res.header("x-auth-token",token).send({user: User.getPublicProfile()}) 
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})
router.post('/logout', auth, async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save();
        res.send('signout successfully')
    } catch (error) {
        res.status(500).send({message: error})
    }
})
router.post('/signup',[verifySignup], async (req, res)=>{
    const data = req.body;
    const User = new user(data)
    try {
        await User.save();
        const token = await User.generateAuthToken();
        res.send({user, token})
    } catch (error) {
        res.status(401).send(error.message)
    }
    // res.send({message : "user signed successfully",data})
})
router.post('/contact',(req, res)=>{
    res.send()
})
router.post('/createBlog',upload.single('photo'),imageProcessor,async (req,res, next)=>{
    const data = pick(req.body,['title','author','content','photo'])
    const Blog = new blog({...data});
    console.log(req.body)
    try {        
        await Blog.save();
        res.send({message:'Article create successfully',blog})

    } catch (error) {
        res.status(401).send(error.message)
    }    
})
router.patch('/updateArticle/:id',upload.single('photo'),imageProcessor,async (req, res)=>{
    const articles = Object.keys(req.body)
    const allowedBlog = ['id','title','author','content','photo']
    console.log(req.params.id)
    const isBlogValid = articles.every((blogProp)=> allowedBlog.includes(blogProp))
    if(!isBlogValid){
        res.status(404).send({message:'Article inserted is not valid'})
    }
    const article = await blog.findByIdAndUpdate(req.params.id, req.body,{new:true,runvalidator:true});
    if(!article){
        res.status(404).send("Article you're try to reach out!!doesnt exist")
    }
    res.send({message: 'blog update successfully',article})
})

router.delete('/deleteArticle/:id',async (req, res)=>{
    const article = await blog.findByIdAndDelete(req.params.id);
    if(!article){
        return res.status(404).send({message:"unable to delete"})
    }
    res.send({message:'Article delete successfully',article})
})
router.get('/blogs', async (req, res)=>{
    const blogs = {}
    blog.find({}, function(err, articles){
            
            articles.forEach( function(article){                
                
                blogs[article.id] = article
                          
            })
            res.send(blogs)       
    });
    
})
router.post('/contactUs',async(req, res)=>{
    try {
        
    
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,//587 //465
            secure: true, 
            auth: {
            user: `moiseniyonkuru1@gmail.com`, 
            pass: `rwanda12.`, 
            }
        });
        
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `moiseniyonkuru1@gmail.com`, // sender address
            to: "moiseniyonkuru1@gmail.com", // list of receivers
            subject: "Message from My brand App ✔", // Subject line
            text: `Hello world?`, // plain text body
            html: `<div>
                    <div style="width:80%;margin:auto;background: teal;color:white;">
                        <br>
                        <p style="font-size: 18px;padding: 0px 10px;">Fullname: ${req.body.fullname}</p>
                        <p style="font-size: 18px;padding: 0px 10px;">Email: ${req.body.email}</p>
                        <p style="font-size: 18px;padding: 0px 10px;">Phone Number: ${req.body.telphone}</p>
                        <p style="font-size: 18px;padding: 0px 10px;">Address: ${req.body.address}</p>
                        <br>
                    </div>
                    <div style="width:80%;margin:auto;background: teal;color:white;text-align: center;">
                        <p style="width: 20%;margin: auto;border-bottom: solid 2px white;color:white;padding-top: 10px;font-size: 22.5px;">Message</p>
                        <p style="padding: 15px 10px;font-size: 22.5px;">" ${req.body.message} "</p>
                        <p style="padding: 15px 10px;font-size: 22.5px;">-- ${new Date()} --</p>
                    </div>
                    </div>`, // html body
        },(err,info)=>{
            if(err){
                console.log(err)
                res.status(404).send('Unable to send Message')
            }
                console.log(info)
                res.send({message:"message sent"})
        });
    } catch (error) {
        res.send({message: 'unable to send email!!'})
    }   
  
})
router.post('/comment/:id', async (req, res)=>{
    try {
        const comment = new Comment({...req.body, blog:req.params.id})
        await comment.save();
        res.send({message: 'Comment Sent Succesfully'})        
    } catch (error) {
        res.send({message: 'Comment Not Sent'})
    }

})
router.get('/comments/:id', async (req, res)=>{
    try {
        const comments = Comment.find({blog: req.params.id},function(err,comments){
            return res.send({message: "comment found",comments})        
        })        
    } catch (error) {
        res.send({message: 'Comment not found!'})
    }

})
router.get('/blog/:id', async (req, res)=>{ 
    Blog.findById({_id: req.params.id},function(err, blog){
        if(err){
            return res.status(404).send({message: 'Blog not found'})
        }
        const comments =Comment.find({"blog":blog.id},function(err, comments){
            res.send({blog: blog, comments: comments})
        })
    })
               
})

router.post('/picture',upload.single('photo'),imageProcessor,(req, res, next)=>{
    const data = pick(req.body,['title','author','content','photo'])
    console.log(data)
})

export default router;

