const { resolveSoa } = require('dns');
const profilemodel = require('../Models/userprofile');
const cloudinary = require('cloudinary');
const {hashpassword,comparepassword} = require('../Helper/authHelper');
const usermodel = require('../Models/usermodel');

const deleteprofilecontroller= async(req,res)=>{
    try{
        const id = req.params.id;
        if(req.user.role !== "job seeker"){
            return res.status(400).send({
                success : true,
                message : "profile cannot be deleted by employer",
            })
        }
        const deletedprofile = await profilemodel.findByIdAndDelete(id);
        return res.status(200).send({
            success : true,
            message : "user profile deleted successfully",
            deletedprofile,
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of deletejobcontroller",
            error,
        })
    }
}

const getprofilebyidcontroller = async(req,res)=>{
    try{
        const id = req.params.id;
        const getprofile = await profilemodel.findOne({_id : id});
        return res.status(200).send({
            success : true,
            message : "successfully we have got profile",
            profile : getprofile
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of getallprofilecontroller",
            error,
        })
    }
}

const getallprofilecontroller = async(req,res)=>{
    try{

        const allprofile = await profilemodel.find({});
        return res.status(200).send({
            success : true,
            message : "successfully we have got all profiles",
            allprofile
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of getallprofilecontroller",
            error,
        })
    }
}

const createprofilecontroller = async(req,res)=>{
    try{
        let {name,email,contact,address,institution,passoutyear,yrofexp} = req.body;
        console.log(name,email,contact,address,institution,passoutyear,yrofexp);
        if(!name ||  !contact || !address || !institution || !passoutyear || !yrofexp){
            return res.status(404).send({
                success : false,
                message : "Please enter all the fields",
            })
        }

        const prevprofile = await profilemodel.findOne({profile_id : req.user._id});
        if(!email){
                email = req.user.email;
        }
        if(req.user.role !== "job seeker"){
            return res.status(400).send({
                success : false,
                message : "only job seeker can create profile"
            })
        }
        const {resume,profile_pic} = req.files;
        if(!resume || !profile_pic){
            return res.status(404).send({
                success : false,
                message : "resume or pfofile pic not received"
            })
        }
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if(!allowedFormats.includes(resume.mimetype)){
            return res.status(400).send({
                success : false,
                message : "resume format not allowed"
            })
        }
        if(!allowedFormats.includes(profile_pic.mimetype)){
            return res.status(400).send({
                success : false,
                message : "profile_pic format not allowed"
            })
        }

        const cloudinaryresponse1 = await cloudinary.uploader.upload(resume.tempFilePath);
        const cloudinaryresponse2 = await cloudinary.uploader.upload(profile_pic.tempFilePath);

        const newprofile = new profilemodel({
            name,
            profile_id : req.user._id,
            email,
            contact,
            address,
            institution,
            passoutyear,
            yrofexp,
            profile_pic : {
                public_id : cloudinaryresponse1.public_id,
                url : cloudinaryresponse1.secure_url
            },
            resume : {
                public_id : cloudinaryresponse2.public_id,
                url : cloudinaryresponse2.secure_url
            },
        });

        const deletedprofile = await profilemodel.findByIdAndDelete(prevprofile._id);
        // console.log(deletedprofile);

        const savedprofile = await profilemodel.insertMany([newprofile]);
        return res.status(201).send({
            success : true,
            message : "profile created successfully",
            profile : savedprofile,
        })


    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of createprofilecontroller",
            error,
        })
    }
}

const updateprofilecontroller = async(req,res)=>{
    try{

    }catch(error){
        console.log(error);
        return res.status(200).send({
            success : true,
            message : "Server side error in case of updateprofilecontroller",
            error,
        })
    }
}

const isSetprofilecontroller = async(req,res)=>{
    try{
        const userid = req.user._id;
        const getprofile = await profilemodel.findOne({profile_id : userid});
        const arr = getprofile.skills;
        if(arr.length === 0){
            return res.status(200).send({
                success : false,message : "skill is not added"
            })
        }
        const s = arr[0];
        const skillsArray = s.split(',');
        if(getprofile){
            return res.status(200).send({
                success : true,
                message : "Profile created successfully",
                skillsArray
            })
        }
        return res.status(200).send({
            success : false,
            message : "You have to create your profile"
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of setprofilecontroller",
            error,
        })
    }
}

const updatepasswordcontroller = async(req,res)=>{
    try{
        const {password} = req.body;
        const oldpassword = req.user.password;
        const id = req.user._id;
        if(!password){
            return res.status(200).send({
                success : true,
                message : "please enter the password"
            });
        }
        const hashedpassword = await hashpassword(password);
        const newuser = await usermodel.findByIdAndUpdate(id,{
            password : hashedpassword,
        },{new : true,runValidators : true});

        return res.status(200).send({
            success : true,
            message : "Password successfully changed",
            newuser
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,message : "Server side error in case of updatepassword",error
        })
    }
}

const addskillcontroller = async(req,res)=>{
    try{
        const {skills} = req.body;
        const id = req.user._id;//user id;
        const user = await profilemodel.findOne({profile_id : id});
        if(!user){
            return res.status(200).send({
                success : false,
                message : "First Create User profile information"
            })
        }
        const newuser = await profilemodel.findByIdAndUpdate(user._id,{skills : skills},
            {new : true, runValidators : true});
        
        return res.status(200).send({
            success : true,
            message : "Skill Added successfully",
            newuser
        })
    }catch(error){
        console.log(error);
        return res.status(200).send({
            success : false,
            message : "Server side error in case of add skill controller",
            error
        })
    }
}

const updatelinkscontroller = async(req,res)=>{
    try{
        const {leetcode_profile,github_profile,codeforces_profile,codechef_profile,atcoder_profile} = req.body;
        if(!github_profile && !leetcode_profile && !codeforces_profile && !codechef_profile && !atcoder_profile){
            return res.status(200).send({
                success : false,
                message : "Fill At least one field",
            })
        }

        const id = req.user._id;
        // console.log(id);
        const profile = await profilemodel.findOne({profile_id : id});
        const newprofile = await profilemodel.findByIdAndUpdate(profile._id,{
            leetcode_profile : leetcode_profile,
            github_profile : github_profile,
            codeforces_profile : codeforces_profile,
            atcoder_profile : atcoder_profile,
            codechef_profile : codechef_profile,
        },{new : true , runValidators : true});


        return res.status(200).send({
            success : true,
            message : "Links Updated successfully",
            newprofile
        })
    }catch(error){
        return res.status(500).send({success : true,message : "server side error",error});
    }
}

const getprofilebyuseridcontroller = async(req,res)=>{
    try{
        const id = req.user._id;
        const getprofile = await profilemodel.findOne({profile_id : id});

        return res.status(200).send({
            success : true,
            message : "successfully got the profile",
            profile : getprofile
        })
    }catch(error){
        console.log(error);

        return res.status(500).send({
            success : false,
            message : "Server side error in case fo getprofilebyuseridcontroller",
            error
        })
    }
}

module.exports = {deleteprofilecontroller,getprofilebyidcontroller,getallprofilecontroller,
    createprofilecontroller,isSetprofilecontroller,updateprofilecontroller,
    updatepasswordcontroller,addskillcontroller,updatelinkscontroller,getprofilebyuseridcontroller}