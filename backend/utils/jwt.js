const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({email: user.mailid,mobile:user.mobile_number},process.env.JWT_SECRET);
};
module.exports = { generateToken };
