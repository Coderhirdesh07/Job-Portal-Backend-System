const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const recruiterSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true,
    },
    companyName:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        trim:true
    },
    location:{
        type:String
    },
    desciption:{
        type:String,
        trim:true
    },
    jobPosted:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'JobListing'
    }]
    
},{timestamps:true});



module.exports = mongoose.model('Recruiter',recruiterSchema);
