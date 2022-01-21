import multer from 'multer'
// dest:'uploads/',
const upload = multer({ 
    limits:{
        fileSize: 1000000
    }
})

export default upload