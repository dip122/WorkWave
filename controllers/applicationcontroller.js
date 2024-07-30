const applicationmodel = require('../Models/applicationmodel');
const usermodel = require('../Models/usermodel.js');
const cloudinary = require('cloudinary');
const jobmodel = require('../Models/jobmodel.js');

const getallapplicationcontroller = async(req,res)=>{
    try{
        const id = req.user._id;
        const user = await usermodel.findById(id);
        if(user.role !== "employer"){
            return res.status(400).send({
                success : false,
                message : "Employer can only see all application post for his posetd job"
            })
        }
        const getallusers = await applicationmodel.find({'employerID.public_id' : id});
        return res.status(200).send({
            success : true,
            message : "Successfully Received all my application",
            getallusers
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of getallapplication controller",
            error,
        })
    }
};

const jobseekerapplicationcontroller = async(req,res)=>{
    try{
        const role = req.user.role;
        // console.log(role);
        if(role !=="job seeker"){
            return res.status(404).send({
                success : false,
                message : "job seeker can see all of his application",
            })
        }

        // console.log(req.user);
        const gethisapplication = await applicationmodel.find({'applicantID.public_id' : req.user._id});
        // console.log(gethisapplication)
        return res.status(200).send({
            success : true,
            message : "successfully received all my application",
            gethisapplication,
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of jobseeker application controller",
            error,
        })
    }
}

const deleteapplicationcontroller = async(req,res)=>{
    try{
        const id = req.params.id;
        if(req.user.role !== "job seeker"){
            return res.status(400).send({
                success : false,
                message : "application controller cannot be deleted by employer",
            })
        }
        const application = await applicationmodel.findByIdAndDelete(id);
        return res.status(200).send({
            success : true,
            messgae : "Application deleted successfully",
            application,
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of delete application controller",
            error,
        })
    }
}

const postapplicationcontroller = async(req,res)=>{
    try{
        const {name,email,coverletter,address,phoneno,class10percentage,class12percentage,jobID} = req.body;
        if(!name || !email || !coverletter || !class10percentage || !class12percentage || !jobID
             || !address || !phoneno){
                return res.status(404).send({success : true,message : "Please enter all the fields"});
        }

        const prevprofile = await applicationmodel.findOne({profile_id : req.user._id});
        
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).send({
                success : false,
                message : 'File Not found'
            })
        }

        const {resume} = req.files;
        if(!resume){
            return res.status(404).send({
                success : false,
                message : "resume not received properly",
            })
        }

        const allowedFormats =  ["image/png", "image/jpeg", "image/webp"];
        if(!allowedFormats.includes(resume.mimetype)){
            return res.status(400).send({
                success : false,
                message : "File Format not supported"
            })
        }
        
        const cloudinaryresponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
        );

        if(!cloudinaryresponse){
            return res.status(404).send({
                success : false,
                message : "Cloudinary response not received",
            })
        }

        ///jobdetails;
        const jobdetails = await jobmodel.findById(jobID);
        // console.log(jobdetails)
        if(!jobdetails){
            return res.status(200).send({
                success : false,
                message : "Job Does Not exist"
            })
        }
        //apllicant who is applying the job
        const applicantID = {
            public_id : req.user._id,
            role : "job seeker",
        }

        //employerID , employer who post the job
        const employerID = {
            public_id : jobdetails.postedBy,
            role : "employer"
        }

        const newpost = new applicationmodel({
            name,
            email,
            coverletter,
            class10percentage,
            class12percentage,
            phoneno,
            address,
            resume: {
                public_id : cloudinaryresponse.public_id,
                url : cloudinaryresponse.secure_url
            },
            applicantID,
            employerID,
            jobId : jobID,
            role : jobdetails.title
        });



        const newsavedpost = await applicationmodel.insertMany([newpost]);
        return res.status(201).send({
            success : true,
            message : "New application is posted successfully",
            application : newsavedpost
        });
        
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message  : "Server side error in case of post application controller",
            error,
        })
    }
}

const alreadyfilledapplicationcontroller = async(req,res)=>{
    try{
        const id = req.params.id;
        const userid = req.user._id;
        const application = await applicationmodel.findOne({jobId : id , 'applicantID.public_id' : userid});
        if(application){
            return res.status(200).send({
                success : true,
                message : "Already applied for this job",
            })
        }

        return res.status(200).send({
            success : false,
            message : "I have not applied for this job"
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of alreadyfilledcontroller",
            error,
        })
    }
}

const deleteapplicationbyjobidcontroller = async(req,res)=>{
    try{
        const id = req.params.id;
        const deleteapplications = await applicationmodel.deleteMany({jobId : id});
        console.log(deleteapplications);
        return res.status(200).send({
            success : true,
            message : "All job deleted",
            deleteapplications
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error",
            error,
        })
    }
}

module.exports = {getallapplicationcontroller,jobseekerapplicationcontroller,deleteapplicationcontroller,
    postapplicationcontroller,alreadyfilledapplicationcontroller,deleteapplicationbyjobidcontroller}