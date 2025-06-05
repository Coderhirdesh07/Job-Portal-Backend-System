const express = require('express');
const router = express.Router();
const {handleGetJobApplicationRoute,handleJobCreationRoute,handleJobDeleteRoute} = require('../controllers/application.controllers.js');

// Routes Related to job listing
router.post('/create/job-listing',verifyJwt,requiredRole('recruiter'),handleJobCreationRoute);
router.delete('/delete/job-listing/:jobId',verifyJwt,requiredRole('recruiter'),handleJobDeleteRoute);

// Routes Related to job Listing for applicants
// get Job Listing
router.get('/job-listing/:jobId/applicants',verifyJwt,requiredRole('recruiter'),handleGetJobApplicationRoute);
// view Candidate for job
router.get('/job-listing/candidates',verifyJwt,requiredRole('recruiter'),);

module.exports = router;