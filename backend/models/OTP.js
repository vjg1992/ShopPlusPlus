// models/OTP.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const otpSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  type: { type: String, enum: ['signup', 'password_reset'], required: true },
  pendingUserData: { type: Object },  
  createdAt: { type: Date, default: Date.now, expires: 600 },
  verified: { type: Boolean, required: false}
});

const OTP = mongoose.model('OTP', otpSchema);
module.exports = OTP;