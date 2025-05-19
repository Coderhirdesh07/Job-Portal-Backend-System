const express = require('express');
const router = express.Router();
const {handleCandidateRegisterRoute,handleCandidateDeleteRoute,handleCandidateLoginRoute,handleCandidateLogoutRoute} = require('../controllers/candidate.controllers.js');


// register routes
router.post('/register',handleCandidateRegisterRoute);
router.post('/login',handleCandidateLoginRoute);
router.post('/logout',handleCandidateLogoutRoute);
router.delete('/delete',handleCandidateDeleteRoute);

// uploads routes
router.post('/upload/cover-image',handleCandidateCoverImageRoute);
router.post('/uploads/resume',handleCandidateResumeUploadsRoute);
router.post('/upload/update/cover-image',handleCandidateUpdateCoverImageRoute);
router.post('/upload/update/resume',handleCandidateUpdateResumeRoute);
router.delete('/upload/delete/resume',handleCandidateDeleteResumeRoute);
router.delete('/upload/delete/cover-image',handleCandidateDeleteCoverImageRoute);

// job applying routes 
router.get('/job-listing',handleCandidateJobListingRoute);
// job apply routes




module.exports = router;