import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    blog:{
        type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'blog'
    }
})

const Comment = mongoose.model('comment',commentSchema);
export default Comment;