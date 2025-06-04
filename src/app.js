const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const candidateRoutes  = require('./routes/candidate.routes.js');
const recruiterRoutes = require('./routes/recruiter.routes.js');
const userRoutes = require('./routes/user.routes.js');
const app = express();



app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


// here we have to register all routes with correct endpoints
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/canidate',candidateRoutes);
app.use('/api/v1/recruiter',recruiterRoutes);



module.exports = app;