const usermodel = require('../Models/usermodel');
const {hashpassword,comparepassword} = require('../Helper/authHelper');
const GenerateToken = require('../config/Token');
const transporter = require('../config/EmailConfig');
const jwt = require('jsonwebtoken')

const registercontroller = async(req,res)=>{
    try{
        const {name,email,password,role,phoneno,badgeno} = req.body;
        //console.log(name,email,password,role,phoneno,badgeno);
        if(!name){
            return res.status(404).send({message : "name is not defined"});
        }
        if(!email){
            return res.status(404).send({message : "eamil is not defined"});
        }
        if(!password){
            return res.status(404).send({message : "password is not defined"});
        }
        if(!role){
            return res.status(404).send({message : "role is not defined"});
        }
        if(!phoneno){
            return res.status(404).send({message : "phoneno is not defined"});
        }
        if(role === "employer"){
            if(badgeno === ""){
                return res.status(200).send({message : "employer should be provide the badege no"});
            }
        }
        const user = await usermodel.findOne({email : email});
        if(user){
            return res.status(200).send({
                success : false,
                message : "User already exists",
            })
        }
        console.log(user)
       // console.log(name,email,password,role,phoneno,badgeno);
        const hashedpassword = await hashpassword(password);
        const newuser = new usermodel({
            name : name,
            email : email,
            password : hashedpassword,
            role : role,
            phoneno : phoneno,
            badegeno : badgeno
        });
        console.log(newuser);
        const savedUser = await usermodel.create({name, email , password :hashedpassword , role, phoneno, badgeno});

        if(savedUser){
            const token = await jwt.sign({id : savedUser._id}, process.env.SECRET_KEY, {expiresIn: "20m"});
            const link = `${process.env.FRONTEND_URL}/verify-email/${savedUser._id}/${token}`
            // console.log(savedUser);
            // console.log(link);
            try{
                const info = await transporter.sendMail({
                    from : process.env.EMAIL,
                    to : email,
                    subject : "Verification Email Sent",
                    text : "Link is Valid for 10m only",
                    html : `<a href = ${link}>${link}</a>`
                });

                // console.log(info);

                res.status(200).send({//donot return it
                    success : true,
                    message : "Email Verification Email is sent to You"
                });

                setTimeout( async()=>{
                    try{
                        await usermodel.findOneAndDelete({_id : savedUser._id, emailverified : false});
                    }catch(error){
                        console.log(error);
                        return res.status(500).send({
                            success : false,
                            message : "Error in deleting not verified user",
                            error
                        })
                    }
                },600000)
            }catch(error){
                console.log(error);
                return res.status(400).send({
                    success : false,
                    message : "Server side error in case of Email Verification operation"
                })
            }
        }
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Sevrer side error in case of registercontroller",
            error
        })
    }
}

const emailverifycontroller = async(req,res)=>{
    const {id, token} = req.params;
    if(!id || !token){
        return res.status(404).send({
            success : false,
            message : "id and token not received"
        })
    }

    try{
        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        const updateduser = await usermodel.findByIdAndUpdate(decode.id, {
            emailverified : true
        }, { new : true });

        return res.status(200).send({
            success : true,
            message : "Email Verified Successfully",
            user : updateduser
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of emailverifycontroller",
            error
        })
    }
}

const logincontroller = async(req,res)=>{
    try{
        const {role,email,password} = req.body;
        if(!role){
            return res.status(404).send({message : "role not found"});
        }
        if(!email){
            return res.status(404).send({message : "Name is not defined"});
        }
        if(!password){
            return res.status(404).send({message : "Password is not defined"});
        }

        const user = await usermodel.findOne({email : email});
        if(!user){
            return res.status(200).send({
                success : false,
                message : "User Does not Exists"
            })
        }

        if(user.emailverified === false){
            return res.status(200).send({
                success : false,
                message : "Verify-Your Email First!"
            })
        }
        if(user.role !== role){
            return res.status(200).send({
                success : false,
                message : "Role of user is not correct",
            })
        }
        const oldpassword = user.password;
        const isMatch = await comparepassword(password,oldpassword);
        // console.log(isMatch);
        if(!isMatch){
            return res.status(404).send({
                success : true,
                message : "Password is not matching",
            })
        }

        const token = await GenerateToken(user._id);
        return res.status(200).send({
            success : true,
            message : "successfully logged in",
            user : {
                _id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
                phoneno : user.phoneno,
                badegno : user.badegno,
            },
            token
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : true,
            message : "Server side error in case of logincontroller",
            error,
        })
    }
}

const updatepasswordcontroller = async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await usermodel.findById(id);//find the user first
        
        if(!user){
            return res.status(404).send({
                success : false,
                message  : "user not found,Please register first",
            })
        }

        const {password} = req.body;
        const hashedpassword = await hashpassword(password);
        const updateduser = await usermodel.findByIdAndUpdate(id,{
            password : hashedpassword,
        },{new : true});

        return res.status(201).send({
            success : true,
            message : "password updated successfully",
            user : updateduser
        });


    }catch(error){
        console.log(error);
        return res.stauts(500).send({
            success : false,
            message  : "Server side error in case of updatepassword controller",
            error,
        })
    }
}

const forgetpasswordcontroller = async(req,res)=>{
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).send({
                success : false,
                message : "Email Not received"
            })
        }
        const user = await usermodel.findOne({email : email});
        if(!user){
            return res.status(200).send({
                success : false,
                message : "User Do not Exists"
            })
        }
        const id = user._id;
        const token = jwt.sign({id : id},process.env.SECRET_KEY, {expiresIn : "10m"});
        const link = `${process.env.FRONTEND_URL}/resetpassword/${token}`;
        const info = await transporter.sendMail({
            from : process.env.EMAIL,
            to : email,
            subject :'Reset Password email sent',
            text : "Link is valid till 20m",
            html : `<a href =${link}>Click Here!</a>`
        });

        if(info){
            return res.status(200).send({
                success : true,
                message : "Email sent successfully"
            })
        }else{
            return res.status(200).send({
                success : false,
                message : "Email Not sent"
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of forgetpasswordcontroller",
            error
        })
    }
}

const resetpasswordcontroller = async(req,res)=>{
    try{
        const {password} = req.body;
        const {token} = req.params;

        // console.log(password, token);
        if(!password || !token){
            return res.status(200).send({
                success : false,
                message : "Password And token not received"
            })
        }
        const decode = jwt.verify(token,process.env.SECRET_KEY);
        const id = decode.id;

        const user = await usermodel.findById(id);
        if(!user){
            return res.status(400).send({
                success : false,
                message : "User do not exist | Error in token",
            })
        }
        const hashedpassword = await hashpassword(password);
        const updateduser = await usermodel.findByIdAndUpdate(id, {
            password : hashedpassword
        } , {new : true});

        return res.status(200).send({
            success :true,
            messgae : "Successfully Password Updated",
            user : updateduser
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of resetpasswordcontroller",
            error
        })
    }
}

module.exports = {registercontroller,logincontroller,updatepasswordcontroller,
    forgetpasswordcontroller,resetpasswordcontroller , emailverifycontroller};