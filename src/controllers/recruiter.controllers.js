const JobListing = require('../models/joblisting.models');
const Application = require('../models/application.models');
const { application } = require('express');

// for create job listing
async function handleJobCreationRoute(request,response){
   const {title,description,requirements,location
      ,employementType,salaryRange} = request.body;
      
     if(!title || !description) response.status(400).json({message:'Title or Description not provided'});  
   
     const jobListing =  JobListing({
      title:title,
      description:description,
      requirements:requirements,
      location:location,
      employementType:employementType,
      salaryRange:salaryRange
     });

     await JobListing.save();

     response.status(200).json({message:'Job Listing Created Successfully'});

}

async function handleJobDeleteRoute(request,response){

}




module.exports = {handleJobCreationRoute,handleJobDeleteRoute};