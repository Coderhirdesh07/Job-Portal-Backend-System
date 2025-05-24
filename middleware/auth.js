const { REPL_MODE_STRICT } = require('repl');
const Candidate = require('../models/candidate.models.js');
const jwt = require('jsonwebtoken');


async function verifyJwt(request,response,next){
    try {
    const token = request.cookies?.token || request.header("Authorisation")?.split(' ')[1];

    if(!token) return response.status(403).json({ message: "Access denied. Token missing." }); // error status codes

    const decodedToken = jwt.verify(token,process.env.AUTHORISATION_SECRET_KEY);

    const candidate = await Candidate.findById(decodedToken?._id).select("-password");

    if(!candidate) return response.status(404).json({ message: "Candidate not found." });

    request.candidate = candidate;
    next();
    } catch (error) {
        console.log("Error occured");
        return response.status(403).json({ message: "Invalid or expired token." });
    }

}





module.exports = {verifyJwt};