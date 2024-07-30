const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"please provide your name"],
    },
    email : {
        type : String,
        required : [true,"Please provide us the email address"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter correct email address");
            }
        }
    },
    coverletter : {
        type : String,
        requried : [true,"Please provide us the coverletter"],
    },
    class10percentage : {
        type : String,
        required : [true,"Please provide the class 10 precentage"],
    },
    class12percentage : {
        type : String,
        requried : [true,"Please provide the class 12 percentage"],
    },
    phoneno : {
        type : String,
        required : [true,"Please provide us the phoneno"],
    },
    address : {
        type : String,
        requried : [true,"Please provide us your address"],
    },
    resume : {
        public_id : {
            type : String,
            required : true,
        },
        url : {
            type : String,
            required : [true,"Please provide us the resume pdf"],
        }
    },
    applicantID  : {
        public_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
            required : [true,"Please provide us the applicant who is applying for the job"],
        },
        role : {
            type : String,
            enum : ["job seeker"],
            requried : true,
        }
    },
    employerID : {
        public_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
            requried : [true,"Please provide us whose application this is"],
        },
        role : {
            type : String,
            enum : ['employer'],
            requried : true,
        }
    },
    jobId : {
        type : String,
    },
    company : {
        type : String
    },
    role : {
        type : String
    }
});

const applicationmodel = mongoose.model('application',Schema);

module.exports = applicationmodel;