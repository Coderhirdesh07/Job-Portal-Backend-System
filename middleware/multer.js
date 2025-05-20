const  multer = require('multer');


const storage = multer.diskStorage({
    destination:function(request,file,cb){
        cb(null,"./public/temp");
    },
    filename:function(request,file,cb){
        cb(null,file.originalname)
    }
})



export const upload = multer({storage});