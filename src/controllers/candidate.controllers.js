const Candidate = require('../models/candidate.models.js');
const cookie = require('cookie-parser');



async function handleCandidateDeleteRoute(request,response){
        const {email} = request.body;
        await Candidate.findOneAndDelete({email});
        response.status(200).json({message:'Candidate Deleted Successfully'});
};


// uploading routes handler

function handleCandidateCoverImage(request,response){
    

}

function handleCandidateResumeUploads(request,response){

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
    handleCandidateCoverImage,
    handleCandidateResumeUploads
};