const express = require('express');
const router = express.Router();
const {verifyJwt} = require('../middleware/auth.js');
const {handleCandidateRegisterRoute,handleCandidateDeleteRoute,handleCandidateLoginRoute,handleCandidateLogoutRoute} = require('../controllers/candidate.controllers.js');


// register routes
router.post('/register',handleCandidateRegisterRoute);
router.post('/login',handleCandidateLoginRoute);
router.post('/logout',verifyJwt,handleCandidateLogoutRoute);
router.delete('/delete',verifyJwt,handleCandidateDeleteRoute);

// uploads routes
router.post('/upload/cover-image',verifyJwt,handleCandidateCoverImageRoute);
router.post('/uploads/resume',verifyJwt,handleCandidateResumeUploadsRoute);
router.post('/upload/update/cover-image',verifyJwt,handleCandidateUpdateCoverImageRoute);
router.post('/upload/update/resume',verifyJwt,handleCandidateUpdateResumeRoute);
router.delete('/upload/delete/resume',verifyJwt,handleCandidateDeleteResumeRoute);
router.delete('/upload/delete/cover-image',verifyJwt,handleCandidateDeleteCoverImageRoute);


// // routes/candidate.js
// const express = require('express');
// const router = express.Router();
// const { uploadCandidateFiles } = require('../controllers/candidate.controller');

// const upload = require('../middleware/multer'); // assuming you exported the multer config

// router.post(
//   '/upload',
//   upload.fields([
//     { name: 'coverImage', maxCount: 1 },
//     { name: 'resume', maxCount: 1 },
//   ]),
//   authMiddleware, // protect the route
//   uploadCandidateFiles
// );

// module.exports = router;




// job applying routes 
router.get('/job-listing',verifyJwt,handleCandidateJobListingRoute);
// job apply routes




module.exports = router;