import mongoose from 'mongoose';
import User from '../models/user';

export default new class verifyUser{
    checkDuplicateEmail(req, res, next){
        User.findOne({email: req.body.email}).exec((err, user)=>{
            if(err){
                return res.status(500).send({message: err})
                // return;
            }
            if(user){
                return res.status(400).send({message: 'Failed! User already exists.'});
                // return;
            }
            if(req.body.password !== req.body.cpassword){
                return res.status(404).send({message: 'Password are not matching'})
            }
            next();
        })
    }
    
}
