import Comment from '../models/comment'
import blog from '../models/blog'
import Blog from '../models/blog';
import {pick} from 'lodash'

export default new class BlogController{

    async createBlog(req,res, next){
        const data = pick(req.body,['title','author','content','photo'])
        const Blog = new blog({...data});
        console.log(req.body)
        try {        
            await Blog.save();
            res.send({message:'Article create successfully',blog})
    
        } catch (error) {
            res.status(401).send(error.message)
        }    
    }

    async update(req, res, next){
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
    }

    async delete(req, res){
        const article = await blog.findByIdAndDelete(req.params.id);
        if(!article){
            return res.status(404).send({message:"unable to delete"})
        }
        res.send({message:'Article delete successfully',article})
    }

    async getAll(req, res){
        const blogs = {}
        blog.find({}, function(err, articles){
                
                articles.forEach( function(article){                
                    
                    blogs[article.id] = article
                              
                })
                res.send(blogs)       
        });        
    }
    async findBlogById(req, res){ 
        Blog.findById({_id: req.params.id},function(err, blog){
            if(err){
                return res.status(404).send({message: 'Blog not found'})
            }
            const comments =Comment.find({"blog":blog.id},function(err, comments){
                res.send({blog: blog, comments: comments})
            })
        })
                   
    }


}