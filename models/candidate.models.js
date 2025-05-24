const mongoose = require('mongoose');
const bcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const candidateSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    resume:{
        type:String,
    },
    coverImage:{
        type:String,
    },
    bio:{
        type:String,
    },
    skils:{
        type:[String]
    },
    expierence:{
        type:String,
    }

});


module.exports = mongoose.model('Candidate',candidateSchema);