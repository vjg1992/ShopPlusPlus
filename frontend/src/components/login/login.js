import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const Login = ({ updateCartCount }) => {
  const [data, setData] = useState({
    emailOrMobile: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const addData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { emailOrMobile, password } = data;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{10}$/;

    if (emailOrMobile === "") {
      toast.warn("Please Enter Your Email or Mobile Number", {
        position: "top-center"
      });
    } else if (isNaN(emailOrMobile) && !emailPattern.test(emailOrMobile)) {
      toast.warn("Please Enter a Valid Email", { position: "top-center" });
    } else if (!isNaN(emailOrMobile) && !mobilePattern.test(emailOrMobile)) {
      toast.warn("Please Enter a Valid 10 Digit Mobile Number", {
        position: "top-center"
      });
    } else if (password === "") {
      toast.warn("Please Enter Your Password", { position: "top-center" });
    } else if (password.length < 6) {
      toast.warn("Password must be at least 6 characters", {
        position: "top-center"
      });
    } else {
      try {
        const res = await fetch("http://localhost:8001/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ emailOrMobile, password })
        });

        const responseData = await res.json();

        if (res.status === 422 || !responseData) {
          if (responseData.error) {
            toast.warn(responseData.error, { position: "top-center" });
          } else {
            toast.warn("Invalid Details", { position: "top-center" });
          }
        } else {
          toast.success("Login Successful", { position: "top-center" });

          localStorage.setItem('token', responseData.token);
          localStorage.setItem('userId', responseData.name);
          
          setData({
            emailOrMobile: "",
            password: ""
          });
          
          const redirectTo = location.state?.from || "/";
          navigate(redirectTo);
          setTimeout(() => {
            window.location.reload();
          }, 100);
          if (responseData.name) {
            try {
              const cartResponse = await fetch('http://localhost:8001/api/cart', {
                headers: {
                  'Authorization': `Bearer ${responseData.token}`,
                },
              });
              const cartData = await cartResponse.json();
              if (cartResponse.ok) {
                updateCartCount(cartData.items.length);  
              }
            } catch (cartError) {
              console.error('Failed to fetch cart items after login:', cartError);
            }
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.", {
          position: "top-center"
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="login_container">
          <div className="login_form">
            <form method="POST">
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
              <div className="loginbutton">
                <button className="login_btn" onClick={sendData}>
                  Login
                </button>
              </div>
            </form>
          </div>

          <div className="register_info">
            <p>New to ShopPlusPlus? </p>
            <NavLink to="/register" state={{ from: location.state?.from }}>
              <button>Create New Account</button>
            </NavLink>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Login;
