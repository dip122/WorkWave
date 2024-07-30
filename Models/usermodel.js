const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema({
    name : {
        type : String,
        lowercase : true ,
        required : [true,"Please enter Your Name"],
    },
    email : {
        type : String,
        required : [true,"Please enter Your email"],
        unique : [true,"Please enter Unique email address"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter a valid email address");
            }
        }
    },
    password : {
        type : String,
        required : [true,"Please enter Your password"],
    },
    role : {
        type : String,
        enum : ["job seeker","employer"],
        required : true,
    },
    phoneno : {
        type : String,
        required : [true,"Please provide Your phoneno"],
    },
    badgeno : {
        type : String,
    },
    emailverified : {
        type : Boolean,
        default : false
    }
});

const usermodel = mongoose.model('user',Schema);

module.exports = usermodel;