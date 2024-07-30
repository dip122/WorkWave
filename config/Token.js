const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const GenerateToken = async(id)=>{
    const token = await jwt.sign({id},process.env.SECRET_KEY,{expiresIn: "7d"});
    return token;
}

module.exports = GenerateToken;