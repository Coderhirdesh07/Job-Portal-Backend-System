const JobListing = require('../models/joblisting.models');
const Application = require('../models/application.models');
const { application } = require('express');


// helps to get all applied job for candidate
async function handleGetJobApplied(request,response){
    const candidateId = request.user._id;
    try{
        const application = await Application.findOne({candidate:candidateId}).populate('Job','title company location').sort({appliedAt:-1});
        response.status(200).json({application,message:'Application fetched Successfully'});
    }
    catch(error){
        console.log(error);
        response.status(500).json({ message: 'Error fetching your applications'});
    }

}
// This helps to apply for job 
async function handlePostJobApplicationRoute(request,response){
 const jobId = request.params.jobId;
 const candidateId = request.user._id;
 try{
    const existing = await Application.findOne({jobId,candidate:candidateId});
    if(existing){
        response.status(400).json({message:'You have already applied to this job'});
    }
    const application = new Application({
        job:jobId,
        candidate:candidateId,
        resume:request.file?request.file.path:undefined,
    });

    await application.save();
    response.status(201).json({message:'Application Send Successfull'});
 }
 catch(error){
    console.log(error);
    response.status(500).json({message:'Server Error'});
 }
}

// this helps to get candidates who applied to  job-listing
async function handleGetJobApplicationRoute(request,response){
     const {jobId} = request.params;
     const recruiterId = request.user._id;

     try{
           const job = await JobListing({_id:jobId,postedBy:recruiterId});
           if(!job) response.status(403).json(
               {message:'You Do not have access to this job or No Such job Exist'})
               

            const applicants = await Application.findOne({job:jobId}).populate('candidate','name','email').sort({appliedAt:-1});

            response.status(200).json(
                  {applicants:applicants
                    ,message:'Applicants SuccessFully Fetched'}
                 );
     }
     catch(error){
        console.log(error);
        response.status(500).json({message:'Internal Server Problem'})
     }

}


module.exports = {handleGetJobApplied,handleGetJobApplicationRoute,handlePostJobApplicationRoute};