const  multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination:function(request,file,cb){
        cb(null,"uploads/");
    },
    filename:function(request,file,cb){
        cb(null,Date.now() + '-' + file.originalname);
    }
})

const fileFilter = (request,file,cb) =>{
    const allowedType = /jpeg|jpg|png|pdf|doc|docx/;
    const ext  = path.extname(file.originalname.toLowerCase());
    if(allowedType.test(ext)){
        cb(null,true);
    }
    else {
        cb(new Error('Unsupported file type'),false);
    }
}



 const upload = multer({storage,fileFilter});
 module.exports = upload;