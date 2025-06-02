const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    requirements:{
        type:[String]
    },
    emoloyementType:{
        type:String,
        enum:['Contract','Full-Time','Part-Time','Internship'],
        default:'Full-Time'
    },
    location:{
        type:String,
        enum:['Remote','On-Site','Hybrid'],
        default:'On-Site'
    },
    salaryRange:{
        min:Number,
        max:Number,
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applicants:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }


},{timestamps:true});


module.exports = mongoose.model('JobListing',jobListingSchema);