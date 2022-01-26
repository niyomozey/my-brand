import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'../uploads/profilePictures/'))
    },
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
})
const upload = multer({ 
    storage: storage,
    // limits:{
    //     fileSize: 3000000
    // }
})
export default upload