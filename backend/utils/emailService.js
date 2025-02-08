// utils/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'vijayshankar871992@gmail.com',
    pass: 'jimx bxrh niqu whcm',
  },
});

const sendOTPEmail = async (email, otp, type) => {
  const subject = type === 'signup' ? 'Email Verification OTP' : 'Password Reset OTP';
  const message = type === 'signup' 
    ? `Your email verification OTP is: ${otp}`
    : `Your password reset OTP is: ${otp}`;

  const mailOptions = {
    from: 'vijayshankar871992@gmail.com',
    to: email,
    subject,
    html: `
      <h1>${subject}</h1>
      <p>${message}</p>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };