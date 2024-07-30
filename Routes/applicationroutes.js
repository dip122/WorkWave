const { getallapplicationcontroller, jobseekerapplicationcontroller, deleteapplicationcontroller, 
    postapplicationcontroller, alreadyfilledapplicationcontroller, 
    deleteapplicationbyjobidcontroller } = require("../controllers/applicationcontroller");

    
const {requireSignIn} = require("../Middlewares/authMiddleware");

const express = require('express');
const router = express.Router();

router.get('/getallapplications',requireSignIn,getallapplicationcontroller);
router.post('/postapplication',requireSignIn,postapplicationcontroller);
router.get('/jobseekerapplication',requireSignIn,jobseekerapplicationcontroller);
router.delete('/deleteapplication/:id',requireSignIn,deleteapplicationcontroller);
router.delete('/deleteapplicationbyjobid/:id',requireSignIn,deleteapplicationbyjobidcontroller);
router.get('/alreadyfilledapplication/:id',requireSignIn,alreadyfilledapplicationcontroller);//to check if current job is already applied or not

module.exports = router;
