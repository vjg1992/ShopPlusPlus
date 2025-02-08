// routes/auth.js
const express = require('express');
const { check } = require('express-validator');
const {
  registerUser,
  initiateSignup,
  verifySignupOTP,
  initiateForgotPassword,
  verifyResetOTP,
  resetPassword
} = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('mobile', 'Mobile number is required').isLength({ min: 10, max: 10 }),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  registerUser
);

router.post(
  '/signup/initiate',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('mobile', 'Mobile number is required').isLength({ min: 10, max: 10 }),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  initiateSignup
);

router.post(
  '/signup/verify',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('otp', 'OTP is required').isLength({ min: 6, max: 6 })
  ],
  verifySignupOTP
);

router.post(
  '/password/forgot',
  [
    check('email', 'Please include a valid email').isEmail()
  ],
  initiateForgotPassword
);

router.post(
  '/password/verify-otp',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('otp', 'OTP is required').isLength({ min: 6, max: 6 })
  ],
  verifyResetOTP
);

router.post(
  '/password/reset',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('confirm_password', 'Confirm password is required').not().isEmpty()
  ],
  resetPassword
);

module.exports = router;