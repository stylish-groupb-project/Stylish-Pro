const express = require('express');
const auth = require('../utils/auth');
const router = express.Router();

const userController = require('../Controller/user_controller');

//get 
router.get('/profile',auth.verifyToken ,auth.authorize("user"),userController.getProfile);

//post
router.post('/signup',userController.signUp);
router.post('/signin',userController.signIn);
router.post('/forgot-password',userController.forgotPassword);
router.post('/reset-password',userController.resetPassword);


module.exports = router;