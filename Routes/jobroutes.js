const express = require('express');
const {requireSignIn} = require('../Middlewares/authMiddleware');
const { getjobcontrollerbyid, getalljobcontroller, deletejobcontroller, postjobcontroller, getallmypostedjobcontroller, updatejobcontroller } = require('../controllers/jobcontroller');
const router = express.Router();

router.post('/createjob',requireSignIn,postjobcontroller);//job is posted by employer
router.get('/getjob/:id',requireSignIn,getjobcontrollerbyid);//job by id
router.get('/getalljobs',requireSignIn,getalljobcontroller);//by user
router.delete('/deletejob/:id',requireSignIn,deletejobcontroller);//by employer
router.get('/getallmypostedjob',requireSignIn,getallmypostedjobcontroller);//employer can see all his posted jobs
router.put('/updatejobcontroller/:id',requireSignIn,updatejobcontroller);


module.exports = router;