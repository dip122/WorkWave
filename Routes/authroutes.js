const express = require('express'); //
const { logincontroller, registercontroller, updatepasswordcontroller, forgetpasswordcontroller, resetpasswordcontroller, emailverifycontroller } = require('../controllers/authcontroller');
const {requireSignIn} = require('../Middlewares/authMiddleware');
const router = express.Router();

router.post('/login',logincontroller);
router.post('/register',registercontroller);
router.post('/updatepassword/:id',updatepasswordcontroller);
router.post('/email-verify/:id/:token',emailverifycontroller);
router.post('/forget-password',forgetpasswordcontroller);
router.post('/resetpassword/:token',resetpasswordcontroller);






router.get('/userauth',requireSignIn,(req,res)=>{
    res.status(200).send({success : true});
});

router.get('/employeauth',requireSignIn,async(req,res)=>{
    try{
        if(req.user.role === "employer"){
            return res.status(200).send({
                success : true,
                message : "Employer authenticated"
            })
        }
        return res.status(200).send({
            success : false,
            message : "User cannot access this part"
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in employee authentication check",
            error,
        })
    }
});


module.exports = router;