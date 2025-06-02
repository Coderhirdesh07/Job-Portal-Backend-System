const Candidate = require('../models/candidate.models.js');
const cookie = require('cookie-parser');


async function handleCandidateRegisterRoute(request,response){
    const {email,firstName,lastName,password} = request.body;

    const isUserAlreadyPresent =  await Candidate.findById({email});
    if(isUserAlreadyPresent) return response.status(200).json({message:'Email Already exist'});

    const hashedPassword = await Candidate.hashedPassword(password);

    const NewCandidate = await Candidate.create({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashedPassword
    });

    response.status(200).json({message:'Candidate Register Successfully'});
};


async function handleCandidateDeleteRoute(request,response){
        const {email} = request.body;

        await Candidate.findOneAndDelete({email});

        response.status(200).json({message:'Candidate Deleted Successfully'});
};


async function handleCandidateLoginRoute(request,response){
    const{email,password} = request.body;

    const candidate = Candidate.findOne({email});
    if(!candidate) return response.status(400).json({message:'Invalid Email or Password'});

    const isPasswordCorrect = await Candidate.comparePassword(password);
    if(isPasswordCorrect==false) return response.status(400).json({message:'Invalid Email or Password'});

    const token = Candidate.generateAuthorisationToken();


    response.status(400).cookie('token').json({message:'Candidate Login Succes'});

};


function handleCandidateLogoutRoute(request,response){

        res.clearCookie('token');

        res.status(400).json({ message: 'Logged out successfully' });

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
    handleCandidateRegisterRoute,
    handleCandidateDeleteRoute,
    handleCandidateLoginRoute,
    handleCandidateLogoutRoute,
    handleCandidateCoverImage,
    handleCandidateResumeUploads
};