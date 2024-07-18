const express = require('express');
const { registerUser, requestOtp, verifyOtp } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);

module.exports = router;
