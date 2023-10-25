const express = require('express');
const auth = require('../utils/auth');
const router = express.Router();

const userController = require('../Controller/user_controller');


//post
router.post('/signup',userController.signUp);
router.post('/signin',userController.signIn);


module.exports = router;