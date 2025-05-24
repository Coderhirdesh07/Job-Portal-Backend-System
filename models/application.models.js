const mongoose = require('mongoose');


const applicationSchema =  new mongoose.Schema({
    Job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job'
    },
    candidate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    resume:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ['pending', 'reviewed', 'accepted', 'rejected'],
        default:'Pending'
    },
    appliedAt:{
        type:Date,
        default:Date.now()
    }
})

const Application = mongoose.model('Application',applicationSchema);
