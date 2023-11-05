const express = require('express');
const auth = require('../utils/auth');
const router = express.Router();

const userController = require('../Controller/user_controller');

//get 
// router.get('/profile',auth.verifyToken ,auth.authorize("admin"),userController.getProfile);
router.get('/profile',auth.verifyToken ,(req, res, next) => {
    auth.authorize("admin")(req, res, next)
      .then(() => {
        userController.getProfile(req, res);
      })
      .catch((error) => {
        // 處理錯誤，例如回傳錯誤頁面或日誌記錄
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
  });

//post
router.post('/signup',userController.signUp);
router.post('/signin',userController.signIn);


module.exports = router;