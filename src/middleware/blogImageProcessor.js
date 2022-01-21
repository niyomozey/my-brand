import sharp from 'sharp'
const imageProcessor = async (req, res, next)=>{
    if(req.file !== undefined ){
        const buffer = await sharp(req.file.buffer).jpeg().toBuffer();
        req.body.photo = buffer
        next()
    }else{
        next()
    }
}
export default imageProcessor;