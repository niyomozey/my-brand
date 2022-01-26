import multer from 'multer'
import path from 'path'
import appRoot from 'app-root-path';
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        // cb(null, path.join(__dirname,'../uploads/blogImages/'))
        cb(null, path.join(appRoot.path,'/src/uploads/blogImages/'))
    },
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
})
const upload = multer({ 
    storage: storage,
    limits:{
        fileSize: 1000000
    }
})
export default upload