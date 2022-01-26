import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        require: true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type : String,
        require : true,
        trim : true,
        minlength: 5,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("password cannot contain 'password'")
            }
        }
    },
    fullname:{
        type: String,
        required: true
    },
    telphone:{
        type: String,
        min: 10,
        max: 13
    },
    username:{
        type:String,
        required : true
    },
    avatar:{
        type: String,
    },
    tokens : [{
        token: {
            type: String,
            require: true
        }
    }]
})
userSchema.methods.getPublicProfile = function(){
    const User = this
    const userObject = User.toObject();
    delete userObject.password
    delete userObject.tokens
    return  userObject
}
userSchema.methods.generateAuthToken = async function(){
    const maxAge = 3*60*60*24;
    const user = this;
    const token = jwt.sign({_id: user._id.toString()},process.env.SECRET_KEY);
    user.tokens = user.tokens.concat({token});
    const t = jwt.sign({_id: user._id.toString()},process.env.SECRET_KEY)
    await user.save();
    return t;
}

userSchema.statics.findByCredentials = async (email, password)=>{
    const User = await user.findOne({email});
    if(!User){
        throw new Error('Unable to login!User doesnt exists')
    }
    const isMatch = await bcrypt.compare(password, User.password)
    if(!isMatch){
        throw new Error('Incorrect usernate or password!')

    }
    return User;
} 

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
})

const user = mongoose.model('users',userSchema)
export default user;