const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    title : {
        type : String,
        requried : [true,"Please specify the title"],
    },
    description : {
        type : String,
        requried : [true,"Please specify the description"],
    },
    category : {
        type : String,
        requried : [true,"Please specify the category of job"],
    },
    country : {
        type : String,
        required : [true,"Please tell me country"],
    },
    city : {
        type : String,
        requried : [true,"Please tell me the city name"],
    },
    location : {
        type : String,
        required : [true,"Please tell me location of the jobs"],
    },
    fixedsalary : {
        type : String,
        min : [4,"Please specify the minimum salary greater than 1000"],
        max : [9,"Please specify the maximum salary less than 1 cr"]
    },
    salaryfrom : {
        type : String,
        min : [4,"Please specify the minimum salary greater than 1000"],
        max : [9,"Please specify the maximum salary less than 1 cr"]
    },
    salaryto : {
        type : String,
        min : [4,"Please specify the minimum salary greater than 1000"],
        max : [9,"Please specify the maximum salary less than 1 cr"]
    },
    expired : {
        type : Boolean,
        default : false,
    },
    jobpostedon : {
        type : Date,
        required : [true,"Please tell me date when job is posted"],
    },
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        requried : [true,"Please specify who posted the job"]
    },
    skills : {
        type : [String],
        default : []
    }
});

const jobmodel = mongoose.model('job',Schema);

module.exports = jobmodel;