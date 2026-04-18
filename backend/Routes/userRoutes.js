const express = require('express');
const { signup, login, resetPasswordRequest, resetPassword} = require('../Logics/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/reset-password-request', resetPasswordRequest);
router.post('/reset-password', resetPassword);


module.exports = router;