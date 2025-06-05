const Candidate = require('../models/candidate.models.js');
const User = require('../models/user.models.js');
const cookie = require('cookie-parser');
const { uploadOnCloudinary } = require('../utils/cloudinary.js');



async function handleCandidateDeleteRoute(request,response){
        const {email} = request.body;
        await Candidate.findOneAndDelete({email});
        response.status(200).json({message:'Candidate Deleted Successfully'});
};


// uploading routes handler

async function handleCandidateCoverImageRoute(request,response){
    try{
      const userId = request.user._id;
     const files = request.files;
     let updates = {};
     if(!files.CoverImage) response.status(400).json({message:'No File To Upload'});
     const coverImageUrl = await uploadOnCloudinary(files.CoverImage[0].buffer,'CoverImage','image');
     updates.coverImageUrl = coverImageUrl;

    const profile = await User.findOneAndUpdate({
        userId:userId,
        $set:updates,
        new:true
     });

    response.status(200).json({message:'CoverImage Uploaded Sucessfully'});
   }
   catch(error){
    console.log(error);
    response.status(500).json({message:'Internal Server Error &  CoverImage upload Failed'});
   }

}

async function handleCandidateResumeUploadRoute(request,response){
   try{
    const userId = request.user._id;
    const files = request.files;
    let updates = {};
    if(!files.resume) response.status(400).json({message:'No File To Upload'});
    const resumeUrl = await uploadOnCloudinary(files.resume[0].buffer,'resume','pdf');
    updates.resumeUrl = resumeUrl;

    const profile = await User.findOneAndUpdate({
        userId:userId,
        $set:updates,
        new:true
     });

    response.status(200).json({message:'Resume Uploaded Sucessfully'});

   }
   catch(error){
    console.log(error);
    response.status(500).json({message:'Internal Server Error & Resume Upload Failed'});
   }
}


// // candidate.controller.js
// const CandidateProfile = require('../models/candidateProfile.model');
// const uploadToCloudinary = require('../utils/uploadToCloudinary');

// const uploadCandidateFiles = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const files = req.files;
//     let updates = {};

//     if (files.coverImage) {
//       const coverUrl = await uploadToCloudinary(files.coverImage[0].buffer, 'coverImages', 'image');
//       updates.coverImageUrl = coverUrl;
//     }

//     if (files.resume) {
//       const resumeUrl = await uploadToCloudinary(files.resume[0].buffer, 'resumes', 'pdf');
//       updates.resumeUrl = resumeUrl;
//     }

//     const profile = await CandidateProfile.findOneAndUpdate(
//       { user: userId },
//       { $set: updates },
//       { new: true }
//     );

//     res.status(200).json({ message: 'Files uploaded successfully', profile });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// };




module.exports = {
    handleCandidateDeleteRoute,
    handleCandidateCoverImageRoute,
    handleCandidateResumeUploadRoute
};