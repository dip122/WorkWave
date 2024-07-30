const express = require('express');
const {requireSignIn} = require('../Middlewares/authMiddleware');
const { deleteprofilecontroller, getprofilebyidcontroller, 
    getallprofilecontroller, createprofilecontroller, isSetprofilecontroller, 
    updateprofilecontroller, updatepasswordcontroller, addskillcontroller, 
    updatelinkscontroller, getprofilebyuseridcontroller } = require('../controllers/profilecontroller');
const router = express.Router();


router.post('/createprofile',requireSignIn,createprofilecontroller);
router.post('/updatepassword',requireSignIn,updatepasswordcontroller);
router.post('/addskill',requireSignIn,addskillcontroller);
router.post('/update-links',requireSignIn,updatelinkscontroller);//add the links
router.post('/updateprofile',requireSignIn,updateprofilecontroller);
router.get('/getprofile',requireSignIn,getallprofilecontroller);//get all the profiles
router.get('/getprofilebyid/:id',getprofilebyidcontroller);//SingleProfile by profile_id
router.get('/getprofilebyuserid',requireSignIn,getprofilebyuseridcontroller);
router.delete('/delete/:id',requireSignIn,deleteprofilecontroller);//delete your profile----Not used
router.get('/getifprofileisset',requireSignIn,isSetprofilecontroller);//if user already has profile-----Not Used

module.exports = router;