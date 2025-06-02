const User = require('../models/user.models.js');
const bcrypt = require('bcrypt');
const Candidate = require('../models/candidate.models.js');
const Recruiter = require('../models/recruiter.models.js');
const auth = require('../../middleware/auth.js');
const role = require('../../middleware/role.js');
const multer = require('../../middleware/multer.js');
const generateToken = require('../utils/jwt.js');
const cookie = require('cookie-parser');



async function handleUserRegisterRoute(request,response){
    try{
     const {email,password,fullName,role} = request.body;

    if(!email || !password || !fullName || !role){
        return response.status(400).json({message:'All Details are not present'});
    }
    if(!['candidate','recruiter'].includes(role)){
        return response.status(400).json({message:'Invalid Role'});
    }
    const doesUserExist = await User.findOne({email});
    if(doesUserExist){
        response.status(400).json({message:'Email Already Exist'});
    }
    const encryptedPassword = await bcrypt.hash(password,10);
    
    const user = new User({
        email:email,
        password:encryptedPassword,
        fullName:fullName,
        role:role
    }) ;
    await user.save();

    // role base
    if(role=='candidate'){
        const candidate = new Candidate({
            user:user._id,
            bio:bio,
            skills:skills,
            expierence:expierence
        });
        await candidate.save();
    }
    if(role==='recruiter'){
        const recruiter = new Recruiter({
            user:user._id,
            location:location,
            phone:phone,
            companyName:companyName,
            description:description
        });
        await recruiter.save();
    }
    response.status(201).json({ message:`${role} registered successfully`});
    }
    catch(error){
        console.error('Registration error:', error);
       response.status(500).json({ message: 'Internal server error'});
    }
}

async function handleUserLoginRoute(request,response) {
    try{
        const {email,password} = request.body;

        if(!email || !password){
            response.status(400).json({message:'Email or Password is Empty'});
        }
        const user = await User.findOne({email:email});
        if(!user) response.status(400).json({message:'Email or Password does not exist'});

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if (!isPasswordCorrect) return response.status(400).json({ message: 'Invalid email or password' });

        const token = generateToken(user);
        response.cookie('token',token,{
            httpOnly:true,
            sameSite:'strict',
            maxAge:1 * 24 * 60 * 60 * 1000
        });
        response.status(200).json({message:'Login Succesfull'});
    }
    catch(error){
        console.log(error);
        response.status(200).json({message:'Login Failed'});
    }
}
async function handelUserLogoutRoute(request,response){
  response.clearCookie('token',{
    httpOnly:true,
    sameSite:'strict',
  });
  response.status(200).json({message:'Logout Successfull'});
}

async function handleGetUserProfileRoute(request,response){

}

async function handleUserDeleteProfileRoute(request,response){

}



module.exports = {handleGetUserProfileRoute,handleUserDeleteProfileRoute,handleUserLoginRoute,handleUserRegisterRoute,handelUserLogoutRoute};
