const express = require('express');
const router = express.Router();
const {verifyJwt} = require('../middleware/auth.js');
const {requiredRole} = require('../middleware/role.js');
const {handlePostJobApplicationRoute,handleGetJobApplied} = require('../controllers/application.controllers.js');
const {handleCandidateCoverImageRoute,handleCandidateResumeUploadRoute} = require('../controllers/candidate.controllers.js');
// uploads routes
router.post('/upload/cover-image',verifyJwt,requiredRole('candidate'),handleCandidateCoverImageRoute);
router.post('/uploads/resume',verifyJwt,requiredRole('candidate'),handleCandidateResumeUploadRoute);
router.post('/upload/update/cover-image',requiredRole('candidate'),verifyJwt,handleCandidateUpdateCoverImageRoute);
router.post('/upload/update/resume',verifyJwt,requiredRole('candidate'),handleCandidateUpdateResumeRoute);
router.delete('/upload/delete/resume',verifyJwt,requiredRole('candidate'),handleCandidateDeleteResumeRoute);
router.delete('/upload/delete/cover-image',verifyJwt,requiredRole('candidate'),handleCandidateDeleteCoverImageRoute);


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





// job related routes
router.post('/job-listing/:jobId/apply',verifyJwt,requiredRole('candidate'),upload.single('resume'),handlePostJobApplicationRoute);
// route to view all applied jobs
router.get('/job-listing/apply',verifyJwt,recruiterRole('candidate'),handleGetJobApplied)


module.exports = router;