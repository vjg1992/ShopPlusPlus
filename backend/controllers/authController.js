// controllers/authController.js
const User = require('../models/User');
const OTP = require('../models/OTP');
const { validationResult } = require('express-validator');
const { sendOTPEmail } = require('../utils/emailService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email, mobile, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(422).json({ error: 'Passwords do not match' });
  }

  try {
    let user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (user) {
      return res.status(422).json({ error: 'User with this email or mobile number already exists' });
    }

    user = new User({
      name,
      email,
      mobile,
      password
    });

    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// controllers/authController.js
const initiateSignup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email, mobile, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(422).json({ error: 'Passwords do not match' });
  }

  try {
    // Check if user exists
    let user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (user) {
      return res.status(422).json({ error: 'User with this email or mobile number already exists' });
    }

    // Generate and store OTP
    const otp = generateOTP();
    
    // Delete any existing OTP for this email
    await OTP.deleteMany({ email, type: 'signup' });

    // Create new OTP document with pending user data
    await OTP.create({
      email,
      otp,
      type: 'signup',
      pendingUserData: {  // Store user data here
        name,
        email,
        mobile,
        password
      }
    });

    // Send OTP
    await sendOTPEmail(email, otp, 'signup');

    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const verifySignupOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpDoc = await OTP.findOne({
      email,
      otp,
      type: 'signup'
    });

    if (!otpDoc) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Get pending user data from OTP document
    const userData = otpDoc.pendingUserData;
    if (!userData) {
      return res.status(400).json({ error: 'Registration data not found' });
    }

    // Create user
    const user = new User(userData);
    await user.save();

    // Clean up
    await OTP.deleteOne({ _id: otpDoc._id });

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const initiateForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const otp = generateOTP();
    
    // Delete any existing OTP for this email
    await OTP.deleteMany({ email, type: 'password_reset' });

    // Create new OTP
    await OTP.create({
      email,
      otp,
      type: 'password_reset'
    });

    await sendOTPEmail(email, otp, 'password_reset');

    res.json({ message: 'Password reset OTP sent to your email' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const verifyResetOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpDoc = await OTP.findOne({
      email,
      otp,
      type: 'password_reset'
    });

    if (!otpDoc) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Store verified status in OTP document
    otpDoc.verified = true;
    await otpDoc.save();
    res.json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const resetPassword = async (req, res) => {
  const { email, password, confirm_password } = req.body;
  if (!email){
    return res.status(400).json({ error: 'Enter a valid email.' });
  }
  if (password !== confirm_password) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    // Find verified OTP
    const otpDoc = await OTP.findOne({
      email,
      type: 'password_reset',
      verified: true
    });

    if (!otpDoc) {
      return res.status(400).json({ error: 'Please verify OTP first' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.password = password;
    await user.save();

    // Clean up
    await OTP.deleteOne({ _id: otpDoc._id });

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  registerUser,
  initiateSignup,
  verifySignupOTP,
  initiateForgotPassword,
  verifyResetOTP,
  resetPassword
};