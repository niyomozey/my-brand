import Comment from '../models/comment'

export default new class commentController{
    async getAll(req, res){
        try {
            const comments = Comment.find({blog: req.params.id},function(err,comments){
                return res.send({message: "comment found",comments})        
            })        
        } catch (error) {
            res.send({message: 'Comment not found!'})
        }
    
    }
    async findCommentById(req, res){
        try {
            const comment = new Comment({...req.body, blog:req.params.id})
            await comment.save();
            res.send({message: 'Comment Sent Succesfully'})        
        } catch (error) {
            res.send({message: 'Comment Not Sent'})
        }    
    }
}