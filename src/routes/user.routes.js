const express = require('express');
const router = express.Router();
const {
    handleGetUserProfileRoute,
    handleUserLoginRoute,
    handleUserRegisterRoute,
    handleUserDeleteProfileRoute,
    handelUserLogoutRoute
} = require('../controllers/user.controller.js');


// common routes 
// register 
 router.post('/register',handleUserRegisterRoute);
// login 
router.post('/login',handleUserLoginRoute);

// logout
router.post('/logout',handelUserLogoutRoute);
// get profile
router.get('/profile',handleGetUserProfileRoute);

router.delete('/delete-profile',handleUserDeleteProfileRoute);


module.exports = router;