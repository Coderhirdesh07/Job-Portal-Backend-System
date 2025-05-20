const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY
});


async function uploadOnCloudinary(localfilepath){

    try{
        if(!localfilepath) return null;
        const response = await cloudinary.UploadStream.upload(localfilepath,{
            resource_type:"auto"
        })
        fs.unlinkSync(localfilepath)
        return response;
    }
    catch(error){
        fs.unlinkSync(localfilepath);
        return null;
    }

}



module.exports = {uploadOnCloudinary};