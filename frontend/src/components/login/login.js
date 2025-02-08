// login.js
import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const Login = ({ updateCartCount }) => {
  const [activeView, setActiveView] = useState('login'); // login, forgotPassword, verifyOTP, resetPassword
  const [data, setData] = useState({
    emailOrMobile: "",
    password: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';

  const addData = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile) => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { emailOrMobile, password } = data;

    if (!emailOrMobile) {
      return toast.warn("Please Enter Your Email or Mobile Number");
    }
    if (!isNaN(emailOrMobile) && !validateMobile(emailOrMobile)) {
      return toast.warn("Please Enter a Valid 10 Digit Mobile Number");
    }
    if (isNaN(emailOrMobile) && !validateEmail(emailOrMobile)) {
      return toast.warn("Please Enter a Valid Email");
    }
    if (!password || password.length < 6) {
      return toast.warn("Password must be at least 6 characters");
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrMobile, password })
      });

      const responseData = await res.json();

      if (res.status === 422 || !responseData) {
        return toast.warn(responseData.error || "Invalid Details");
      }

      localStorage.setItem('token', responseData.token);
      localStorage.setItem('userId', responseData.name);
      toast.success("Login Successful");

      // Fetch cart data
      try {
        const cartResponse = await fetch(`${API_BASE_URL}/api/cart`, {
          headers: { 'Authorization': `Bearer ${responseData.token}` },
        });
        const cartData = await cartResponse.json();
        if (cartResponse.ok) {
          updateCartCount(cartData.items.length);
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }

      setData({ emailOrMobile: "", password: "" });
      navigate(location.state?.from || "/");
      setTimeout(() => window.location.reload(), 100);

    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const { emailOrMobile } = data;

    if (!emailOrMobile || !validateEmail(emailOrMobile)) {
      return toast.warn("Please enter a valid email address");
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/password/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrMobile })
      });

      const responseData = await res.json();

      if (res.ok) {
        toast.success("OTP sent to your email");
        setActiveView('verifyOTP');
      } else {
        toast.error(responseData.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const { emailOrMobile, otp } = data;

    if (!otp || otp.length !== 6) {
      return toast.warn("Please enter a valid 6-digit OTP");
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/password/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailOrMobile,
          otp
        })
      });

      const responseData = await res.json();

      if (res.ok) {
        toast.success("OTP verified successfully");
        setActiveView('resetPassword');
      } else {
        toast.error(responseData.error || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const { emailOrMobile, newPassword, confirmNewPassword } = data;

    if (newPassword !== confirmNewPassword) {
      return toast.warn("Passwords do not match");
    }

    if (newPassword.length < 6) {
      return toast.warn("Password must be at least 6 characters");
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/password/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailOrMobile,
          password: newPassword,
          confirm_password: confirmNewPassword
        })
      });

      const responseData = await res.json();

      if (res.ok) {
        toast.success("Password reset successful");
        setActiveView('login');
        setData({
          emailOrMobile: "",
          password: "",
          otp: "",
          newPassword: "",
          confirmNewPassword: ""
        });
      } else {
        toast.error(responseData.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const renderLoginForm = () => (
    <form method="POST" onSubmit={handleLogin}>
      <h2>Sign-In</h2>
      <div className="login_data">
        <label htmlFor="emailOrMobile">Email / Mobile Number</label>
        <input
          type="text"
          onChange={addData}
          value={data.emailOrMobile}
          name="emailOrMobile"
          id="emailOrMobile"
        />
      </div>
      <div className="login_data">
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          onChange={addData}
          value={data.password}
          name="password"
          id="password"
          placeholder="At least 6 characters..."
        />
        <div className="password_input">
          <input
            type="checkbox"
            id="showPasswordCheckbox"
            onChange={togglePasswordVisibility}
          />
          <label htmlFor="showPasswordCheckbox">Show Password</label>
        </div>
      </div>
      <div className="forgot_password">
        <button type="button" onClick={() => setActiveView('forgotPassword')}>
          Forgot Password?
        </button>
      </div>
      <div className="loginbutton">
        <button type="submit" className="login_btn">
          Login
        </button>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form method="POST" onSubmit={handleForgotPassword}>
      <h2>Forgot Password</h2>
      <div className="login_data">
        <label htmlFor="emailOrMobile">Email Address</label>
        <input
          type="email"
          onChange={addData}
          value={data.emailOrMobile}
          name="emailOrMobile"
          id="emailOrMobile"
        />
      </div>
      <div className="loginbutton">
        <button type="submit" className="login_btn">
          Send OTP
        </button>
      </div>
      <div className="back_to_login">
        <button type="button" onClick={() => setActiveView('login')}>
          Back to Login
        </button>
      </div>
    </form>
  );

  const renderVerifyOTPForm = () => (
    <form method="POST" onSubmit={handleVerifyOTP}>
      <h2>Verify OTP</h2>
      <div className="login_data">
        <label htmlFor="otp">Enter OTP</label>
        <input
          type="text"
          onChange={addData}
          value={data.otp}
          name="otp"
          id="otp"
          maxLength="6"
          placeholder="Enter 6-digit OTP"
        />
      </div>
      <div className="loginbutton">
        <button type="submit" className="login_btn">
          Verify OTP
        </button>
      </div>
    </form>
  );

  const renderResetPasswordForm = () => (
    <form method="POST" onSubmit={handleResetPassword}>
      <h2>Reset Password</h2>
      <div className="login_data">
        <label htmlFor="newPassword">New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          onChange={addData}
          value={data.newPassword}
          name="newPassword"
          id="newPassword"
          placeholder="At least 6 characters..."
        />
      </div>
      <div className="login_data">
        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          onChange={addData}
          value={data.confirmNewPassword}
          name="confirmNewPassword"
          id="confirmNewPassword"
          placeholder="Re-enter password..."
        />
        <div className="password_input">
          <input
            type="checkbox"
            id="showPasswordCheckbox"
            onChange={togglePasswordVisibility}
          />
          <label htmlFor="showPasswordCheckbox">Show Password</label>
        </div>
      </div>
      <div className="loginbutton">
        <button type="submit" className="login_btn">
          Reset Password
        </button>
      </div>
    </form>
  );

  return (
    <section>
      <div className="login_container">
        <div className="login_form">
          {activeView === 'login' && renderLoginForm()}
          {activeView === 'forgotPassword' && renderForgotPasswordForm()}
          {activeView === 'verifyOTP' && renderVerifyOTPForm()}
          {activeView === 'resetPassword' && renderResetPasswordForm()}
        </div>

        {activeView === 'login' && (
          <div className="register_info">
            <p>New to ShopPlusPlus? </p>
            <NavLink to="/register" state={{ from: location.state?.from }}>
              <button>Create New Account</button>
            </NavLink>
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;