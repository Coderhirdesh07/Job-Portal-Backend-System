const express = require('express');
const router = express.Router();
const {handleGetJobApplicationRoute} = require('../controllers/application.controllers.js');



router.get('/job-listing/:jobId/applicants',verifyJwt,requiredRole('recruiter'),handleGetJobApplicationRoute);




module.exports = router;