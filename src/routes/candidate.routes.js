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





// job related routes
router.post('/job-listing/:jobId/apply',verifyJwt,requiredRole('candidate'),upload.single('resume'),handlePostJobApplicationRoute);
// route to view all applied jobs
router.get('/job-listing/apply',verifyJwt,recruiterRole('candidate'),handleGetJobApplied)


module.exports = router;