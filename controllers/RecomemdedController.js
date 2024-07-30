const jobmodel = require('../Models/jobmodel');
const userprofile = require('../Models/userprofile');

const recomendedjobcontroller = async (req, res) => {
    try {
        const jobs = await jobmodel.find({});
        const id = req.user._id;
        // console.log(id);
        const getprofile = await userprofile.findOne({ profile_id: id });
        if(!getprofile){
            return res.status(200).send({
                success : false,
                message : "Profile Not set"
            })
        }
        if(getprofile.skills.length === 0){
            return res.status(200).send({
                success : false,
                message : "skills not found"
            })
        }
        const array = getprofile.skills[0].split(",");
        const myskillsSet = new Set(array);
        //console.log(myskillsSet);

        let arr = jobs.map(job => {
            const jobSkillsSet = new Set(job.skills);
            let match = 0;

            // Count the number of matching skills
            for (let skill of myskillsSet) {
                if (jobSkillsSet.has(skill)) {
                    match++;
                }
            }

            //console.log(match);

            return {
                job,
                match,
            };
        });

        //console.log(arr);

        // Sort by match count in descending order
        arr.sort((a, b) => b.match - a.match);
        
        // Filter out jobs with no matching skills
        const getpositive = arr.filter(item => item.match > 0).slice(0,4);

        //console.log(getpositive);

        if(getpositive)return res.status(200).send({
            success: true,
            message: "Recommended Jobs",
            jobs: getpositive,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Server side error", error });
    }
};

module.exports = { recomendedjobcontroller };
