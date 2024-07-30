const jwt = require('jsonwebtoken');
const usermodel = require('../Models/usermodel.js');
const requireSignIn = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
       // console.log(token);
        if(!token){
            return res.status(404).send({
                success : false,
                message : "token is not received",
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        const user = await usermodel.findById(decode.id);
        req.user = user;
        next();
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of requireSignIn middlewares",
            error,
        })
    }
}

module.exports = {requireSignIn};