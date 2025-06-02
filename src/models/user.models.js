const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt  = require('bcrypt');
const { timeStamp } = require('console');


const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
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
    role:{
        type:String,
        enum:['candidate','recruiter'],
        default:true
    },
 },{
    timeStamp:true
    });

 userSchema.pre('save',async function (next) {
     if(!this.isModified) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
 });

 module.exports = mongoose.model('User',userSchema);