const jobmodel = require('../Models/jobmodel');

const getjobcontrollerbyid = async(req,res)=>{
    try{
        const id = req.params.id;
        const job = await jobmodel.findById(id);
        //console.log(job);
        return res.status(200).send({
            success : true,
            message : "Successfully got the job",
            job,
        }) 
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of getjobcontroller",
            error,
        })
    }
};

const getalljobcontroller = async(req,res)=>{
    try{
        const id = req.user._id;
        // if(req.user.role !== "job seeker"){
        //     return res.status(200).send({
        //         success : false,
        //         message : "only job seeker can see all posted jobs"
        //     })
        // }
        const jobs = await jobmodel.find({});
        return res.status(200).send({
            success : true,
            message : "all jobs successfully got",
            jobs,
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of getalljobcontroller",
            error,
        })
    }
}

const deletejobcontroller = async(req,res)=>{
    try{
        const id = req.params.id;
        const deletedjob = await jobmodel.findByIdAndDelete(id);
        return res.status(200).send({
            success : true,
            message : "job successfully deleted",
            deletedjob
        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of deletejoncontroller",
            error
        })
    }
}

const postjobcontroller = async(req,res)=>{
    try{
        const {title,description,category,country,city,location,fixedsalary,salaryfrom,salaryto,jobpostedon,skills} = req.body;
        const id = req.user._id;
        if(req.user.role !== "employer"){
            return  res.status(200).send({
                success : false,
                message : "job cannot be posted by user"
            })
        }
        if(!title || !description || !category || !country || !city || !location){
                return res.status(400).send({
                    success : false,
                    message : "Please fill all the fields"
                })
        }
        if(!salaryfrom && !salaryto && !fixedsalary){
            return res.status(400).send({
                success : false,
                message : "ALl three field cannot be empty",
            })
        }
        if(!fixedsalary){
            if(!salaryfrom || !salaryto){
                return res.status(400).send({
                    success : false,
                    message : "Please fill all the fields"
                })
            }
        }
        if(fixedsalary && salaryfrom && salaryto){
            return res.status(400).send({
                success : false,
                message : "Please fill the whole form"
            })
        }

        const newjob = new jobmodel({
            title,
            description,
            category,
            country,
            city,
            location,
            fixedsalary,
            salaryfrom,
            salaryto,
            jobpostedon : new Date(),
            postedBy : req.user._id,
            skills : skills
        });

        const savedjob = await jobmodel.insertMany([newjob]);
        return res.status(201).send({
            success : true,
            message : "job posted successfully",
            job : savedjob
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of postjobcontroller",
            error,
        })
    }
};

const getallmypostedjobcontroller = async(req,res)=>{
    try{
        if(req.user.role!=="employer"){
            return res.status(400).send({
                success : false,
                message : "only employer can see posted jobs",
            })
        }

        const id = req.user._id;
        const alljobs = await jobmodel.find({postedBy : id});
        return res.status(200).send({
            success : true,
            message : "successfully I have got all my posted job",
            alljobs
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message  : "Server side error in case of getallmypostedjobcontroller",
            error,
        })
    }
};

const updatejobcontroller = async(req,res)=>{
    try{
        const id = req.params.id;
        if(req.user.role !=="employer"){
            return res.status(200).send({
                success : false,
                message : "job can be updated by job seeker",
            })
        }
        const updatedjob = await jobmodel.findByIdAndUpdate(id, req.body, {new : true});

        return res.status(200).send({
            success : true,
            message : "job updated successfully",
            updatedjob
        })

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of updatejobcontroller",
            error,
        })
    }
}
module.exports = {getjobcontrollerbyid,getalljobcontroller,deletejobcontroller,postjobcontroller,
    getallmypostedjobcontroller,updatejobcontroller};