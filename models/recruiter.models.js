const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const recruiterSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
    },
    
});

recruiterSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

recruiterSchema.methods.generateAuthToken = function(){
    return jwt.sign({
        fullName:this.fullName,
        email:this.email,
        _id:this._id
    },process.env.AUTHORISATION_SECRET_KEY,{expiresIn:'24h'});
}

recruiterSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
};



module.exports = mongoose.model('Recruiter',recruiterSchema);
