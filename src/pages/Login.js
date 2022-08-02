import React from "react";
import bg from "../img/bg.jpg";
export default function Login() {
  return (
    <div className="main-container">
      <div className="signup-login-container">
        <div className="signup-img">
          <img
            src={bg}
            alt="dddd"
            style={{
              width: "96%",
              minWidth: "96%",
              borderRadius: "2rem",
              height: "250px",
            }}
          />
          <h1 className="text-glow">SIGN IN</h1>
        </div>
        <div className="login-form">
          <form>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button>LOGIN</button>
          </form>
          <div className="signup-panel">
            <h2 className="title">Sign Up</h2>
            <p className="signup-subtext">
              Sign up here if you don't have account
            </p>
            <button className="signup-btn">SIGN UP</button>
          </div>
        </div>
      </div>
    </div>
  );
}
