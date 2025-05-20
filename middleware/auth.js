const Candidate = require('../models/candidate.models.js');
const jwt = require('jsonwebtoken');


async function verifyJwt(request,_,next){
    try {
    const token = request.cookies?.token || request.header("Authorisation")?.replace("Bearer ","")

    if(!token) return;

    const decodedToken = jwt.verify(token,process.env.AUTHORISATION_SECRET_KEY);

    const candidate = await Candidate.findById(decodedToken?._id).select("-password");

    if(!candidate) return;

    request.candidate = candidate;
    next();
    } catch (error) {
        console.log("Error occured");
    }

}



module.exports = {verifyJwt};