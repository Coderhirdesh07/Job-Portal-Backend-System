const express = require('express');
const router = express.Router();
const {handleCandidateRegisterRoute,handleCandidateDeleteRoute,handleCandidateLoginRoute,handleCandidateLogoutRoute} = require('../controllers/candidate.controllers.js');


// register routes
router.post('/register',handleCandidateRegisterRoute);
router.post('/login',handleCandidateLoginRoute);
router.post('/logout',handleCandidateLogoutRoute);
router.delete('/delete',handleCandidateDeleteRoute);


module.exports = router;