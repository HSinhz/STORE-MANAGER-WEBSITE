const express = require('express');
const router = express.Router();
const LoginController = require('../app/controllers/LoginController')

router.post('/login', LoginController.handlerLogin);


module.exports = router;