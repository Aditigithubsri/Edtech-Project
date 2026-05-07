import React, { useState } from "react";
import "./Login.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] =
    useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = () => {
    setError("");

    if (
      !email ||
      !password ||
      (!isLogin && !name)
    ) {
      setError("Please fill all fields");
      return;
    }

    const userData = {
      name: isLogin ? email.split("@")[0] : name,
      email,
    };

    // Save user data
    localStorage.setItem(
      "taskUser",
      JSON.stringify(userData)
    );

    if (isLogin) {
      alert("Login Successful");
    } else {
      alert("Registration Successful");
    }

    navigate("/dashboard");

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="loginContainer">
      <div className="mainContainer">
        <div className="formContainer">

          {isLogin ? (
            <>
              <p className="para">
                Login to your account
              </p>

              <input
                type="email"
                placeholder="Enter Email"
                className="inputBox"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <div className="passwordContainer">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter Password"
                  className="inputBox"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <span
                  className="eyeIcon"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>

              {error && (
                <p className="errorText">
                  {error}
                </p>
              )}

              <button
                className="btn"
                onClick={handleSubmit}
              >
                Login
              </button>

              <div className="paraContainer">
                <div
                  className="paraText"
                  onClick={() => {
                    setIsLogin(false);
                    setError("");
                    setEmail("");
                    setPassword("");
                  }}
                >
                  Create an account

                  <span className="arrowIcon">
                    <MdKeyboardArrowRight />
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="para">
                Create your account
              </p>

              <input
                type="text"
                placeholder="Enter Name"
                className="inputBox"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <input
                type="email"
                placeholder="Enter Email"
                className="inputBox"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <div className="passwordContainer">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter Password"
                  className="inputBox"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <span
                  className="eyeIcon"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>

              {error && (
                <p className="errorText">
                  {error}
                </p>
              )}

              <button
                className="btn"
                onClick={handleSubmit}
              >
                Register
              </button>

              <div className="paraContainer">
                <div
                  className="paraText"
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                    setName("");
                    setEmail("");
                    setPassword("");
                  }}
                >
                  Already have an account?

                  <span className="arrowIcon">
                    <MdKeyboardArrowRight />
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;