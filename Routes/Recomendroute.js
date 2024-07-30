const express = require('express');
const { requireSignIn } = require('../Middlewares/authMiddleware');
const { recomendedjobcontroller } = require('../controllers/RecomemdedController');
const router = express.Router();


router.get('/recomemdedjobs',requireSignIn,recomendedjobcontroller);

module.exports = router;