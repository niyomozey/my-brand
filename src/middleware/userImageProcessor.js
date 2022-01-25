import sharp from 'sharp'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename:function(req,file,cb){
        cb(null, file.filename)
    }
})
const upload = multer({storage: storage})

const imageProcessor = async (req, res, next)=>{
    if(req.file !== undefined ){
        req.body.avatar = req.file.path
        next()
    }else{
        next()
    }
}
export default imageProcessor;