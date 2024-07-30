const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please put Your Name"],
    },
    profile_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : [true,"User who is making this profile is needed"],
    },
    email : {
        type : String,
        required : [true,"Please put your email address"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter your email address");
            }
        }
    },
    contact : {
        type : String,
        required : [true,"Please put your contact address"],
    },
    address : {
        type : String,
        required : true,
    },
    institution : {
        type : String,
        requried : [true,"Please provide your college details"],
    },
    leetcode_profile : {
        type : String,
        default : "",
    },
    github_profile : {
        type : String,
        default : "",
    },
    codeforces_profile : {
        type : String,
        default : "",
    },
    atcoder_profile : {
        type : String,
        default : "",
    },
    codechef_profile : {
        type : String,
        default : "",
    },
    passoutyear : {
        type : String,
        min : [4,"Please passout year should have more that 4 digits"],
        max : [4,"Please passout year should have less than 5 digits"]
    },
    yrofexp : {
        type : Number,
        default : 0
    },
    profile_pic : {
        public_id : {
            type : String,
            required : true,
        },
        url : {
            type : String,
            required : true,
        }
    },
    resume : {
        public_id : {
            type : String,
            required : true,
        },
        url : {
            type : String,
            required : true
        }
    },
    skills : {
        type : [String],
        default : [],
    }
});

const profilemodal = mongoose.model('userprofile',Schema);

module.exports = profilemodal;