const express = require('express');
const router = express.Router();
const { register, otpLogin, login } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.post('/otp-login', otpLogin);

module.exports = router;