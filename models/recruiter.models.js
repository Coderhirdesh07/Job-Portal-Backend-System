const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const recruiterSchema = new mongoose.Schema({
    
});



module.exports = mongoose.model('Recruiter',recruiterSchema);
