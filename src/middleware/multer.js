const  multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:function(request,file,cb){
    const ext = path.extname(file.originalname).toLowerCase();
    if(['.pdf','.doc','.docx'].includes(ext)){
        cb(null,'/uploads/resumes/');
    }
    else if(['.jpeg','.jpg','.png'].includes(ext)){
        cb(null,'/uploads/images/');
    }
    else{
        cb(new Error('Unsupported file type'),false);
    }
        
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

 const upload = multer({storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
 }
);

 module.exports = upload;