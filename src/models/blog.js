import mongoose, { Mongoose } from 'mongoose';
import jwt from 'jsonwebtoken';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    created : {
        type: Date
    },
    photo: { 
        type: Buffer,
    },
    content: {
        type: String,
        required: true
    }
})
blogSchema.pre('save',async function(){
    const blog = this
    blog.created = new Date()
})
const Blog= mongoose.model('blog',blogSchema)
export default Blog