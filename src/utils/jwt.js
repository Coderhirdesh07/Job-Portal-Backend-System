const jwt = require('jsonwebtoken');

function generateToken(user){
return jwt.sign(
    {
    id:user._id,
    email:user.email,
    role:user.role}
    ,process.env.AUTHORISATION_SECRET_KEY,
    {expiresIn:'1d'}
);
}

module.exports = generateToken;