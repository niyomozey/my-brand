import verifySignup from '../middleware/verifyUser';
import auth from '../middleware/auth'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import Comment from '../models/comment'
import blog from '../models/blog'
import user from '../models/user'
import express from 'express'
import Blog from '../models/blog';
import imageProcessor from '../middleware/blogImageProcessor.js'
import {pick} from 'lodash'
import validator from 'validator';

export default new class userController{
    
    async login(req,res, next){
        const data = req.body;
        console.log(data)
        try {
            const User = await user.findByCredentials(data.email, data.password)
            const token = await User.generateAuthToken();
            res.cookie('jwtoken',token)
            res.header("Authorization",token).send({user: User.getPublicProfile()}) 
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }
    async logout(req, res){
        const maxAge = 3*60*60*24;
        try {            
            req.user.tokens = req.user.tokens.filter((token)=>{
                return token.token !== req.token
            })
            await req.user.save();
            res.cookie('jwtoken','',{maxAge: 1})
            res.send('signout successfully')
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    }
    async signup(req, res){
        const maxAge = 3*60*60*24;
        const data = pick(req.body,['fullname','username','telphone','email','password','avatar','tokens']);
        console.log(data)
        const User = new user({...data})
        try {
            await User.save();
            const token = await User.generateAuthToken();
            res.cookie('jwtoken',token,{httpOnly: true, maxAge: maxAge*1000})
            res.send({
                user, token
            })
        } catch (error) {
            res.status(401).send(error.message)
        }
    }
    async update(req, res, next){
        const User = Object.keys(req.body)
        delete User.cpassword
        const allowedUser = ['fullname','username','telphone','email','password','avatar','tokens']
        const isUserValid = User.every((userProp)=> {
            console.log(userProp)
            allowedUser.includes(userProp)
        })
        if(!isUserValid){
            return res.status(404).send({
                message:'Invalid Data fields'
            })
        }
        const profile = await user.findByIdAndUpdate(req.params.id, req.body,{new:true,runvalidator:true});
        if(!profile){photo
            return res.status(404).send("User you're try to reach out!!doesnt exist")
        }
        res.send({
            message: 'Profile update successfully',
            profile
        })
    }
    async profile(req, res){
        const data = user.find({},function(err, userprofile){
            if(!userprofile){
                return res.send({message:'No User found'})                
            }
            res.status(200).send({message:'User Found',userprofile})
        })           
    }
    async delete(req, res){
        const article = await user.findByIdAndDelete(req.params.id);
        if(!article){
            return res.status(404).send({message:"unable to delete"})
        }
        res.send({message:'User deleted successfully',article})
    }
    async updateProfilePicture(req, res, next){
        const User = Object.keys(req.body)
        const allowedUser = ['avatar','tokens']
        const isUserValid = User.every((userProp)=> {
            allowedUser.includes(userProp)
        })
        // if(!isUserValid){
        //     return res.status(404).send({
        //         message:'Invalid Data fields'
        //     })
        // }
        const profile = await user.findByIdAndUpdate(req.params.id, {'avatar':req.body.avatar},{new:true,runvalidator:true});
        if(!profile){
            return res.status(404).send("User profile you're try to reach out!!doesnt exist")
        }
        res.send({
            message: 'Profile pictures update successfully',
            profile
        })
    }
}