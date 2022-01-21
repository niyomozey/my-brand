
import verifySignup from '../middleware/verifyUser';
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

export default new class contactController{
    async sendEmail(req, res){
        try {
            
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,//587 //465
                secure: false,//milky8175@gmail.com
                auth: {
                user: `milky8175@gmail.com`, 
                pass: `Milky8175..`,
                }
            });
            
            // send mail with defined transport object
            let info = transporter.sendMail({
                from: `milky8175@gmail.com`, // sender address
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
      
    }
}