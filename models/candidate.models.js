const mongoose = require('mongoose');
const bcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const candidateSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        Select:false,
    },
    profileImage:{
        type:String,
    },
    resume:{
        type:String,
    }

});

candidateSchema.statics.hashPassword = async function(password){
    return await bcypt.hash(password,10);
}

candidateSchema.methods.comparePassword = async function(password){
    return await bcypt.compare(password,this.password);
}

candidateSchema.methods.generateAuthorisationToken = function(){
    return jwt.sign({
        email:this.email,
        _id:this._id
    },process.env.AUTHORISATION_TOKEN_SECRET_KEY,{expiresIn:'24h'});
}

module.exports = mongoose.model('Candidate',candidateSchema);