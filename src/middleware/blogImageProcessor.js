import sharp from 'sharp'
import multer from 'multer'
import appRoot from 'app-root-path';
import cloudinary from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'dthzdkte3', 
    api_key: '735443266482341', 
    api_secret: 'uAP4Ni9xRap0BTPFHjjuvjS4PJc' 
  });

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        // cb(null, './uploads/blogImages/')
        cb(null, appRoot.path+'/src/uploads/blogImages/')
    },
    filename:function(req,file,cb){
        cb(null, file.filename)
    }
})
const upload = multer({storage: storage})

const imageProcessor = async (req, res, next)=>{
    console.log('----'+req.files.photo)
    if(req.file !== undefined ){
        req.body.photo = req.file.path
        // cloudinary.uploader.upload(req.files.photo, (err, result)=>{
        //     console.log(result)
        // })
        // next()
    }else{
        // next()
    }
}
export default imageProcessor;