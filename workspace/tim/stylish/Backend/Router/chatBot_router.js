const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const chatBotController = require('../Controller/chatBot_controller');

//post

router.get('/', chatBotController.getChatResolution);


module.exports = router;