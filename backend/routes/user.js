const express = require('express');
const { check } = require('express-validator');
const { 
  registerUser, 
  loginUser, 
  getUserDetails, 
  updateUserDetails, 
  updateUserAddress 
} = require('../controllers/userController');
const auth = require('../middleware/auth'); 

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
  '/login',
  [
    check('emailOrMobile', 'Please include a valid email or mobile number').not().isEmpty(),
    check('password', 'Password is required').exists()
  ],
  loginUser
);

router.get('/me', auth, getUserDetails);

router.put(
  '/me',
  auth,
  [
    check('name', 'Name is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
    check('mobile', 'Mobile number is required').optional().isLength({ min: 10, max: 10 }),
    check('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 })
  ],
  updateUserDetails
);

router.put(
  '/me/address',
  auth,
  updateUserAddress
);

module.exports = router;
