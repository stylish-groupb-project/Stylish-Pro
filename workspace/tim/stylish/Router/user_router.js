const express = require('express');
const auth = require('../utils/auth');
const router = express.Router();

const userController = require('../Controller/user_controller');


//post
router.post('/signup',auth.verifyToken,userController.signUp);


module.exports = router;