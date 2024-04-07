const express = require('express');
const router = express.Router();
const OtpController = require('../app/controllers/OtpController')

router.post('/verify', OtpController.verify )
router.get('/generate', OtpController.inputOtp )
router.get('/reotp', OtpController.reOTP)
module.exports = router;