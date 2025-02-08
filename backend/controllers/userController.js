const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { emailOrMobile, password } = req.body;

  try {
    let user = await User.findOne({ $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }] });

    if (!user) {
      return res.status(422).json({ error: 'Invalid credentials' });
    }
    
    if (password !== user.password) {
      return res.status(422).json({ error: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, name: user.name });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


const updateUserDetails = async (req, res) => {
  const { name, email, mobile, password, addresses } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;
    user.addresses = addresses || user.addresses;

    if (password) {
      user.password = password;
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateUserAddress = async (req, res) => {
  const { addresses } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.addresses = addresses;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { loginUser, getUserDetails, updateUserDetails, updateUserAddress };
