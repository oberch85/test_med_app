import React from "react";
import "./Navbar.css";

const Navbar = ({ onLoginClick, onSignUpClick }) => {
  return (
    <nav>
      <div className="nav-left">
        <span className="app-title">StayHealthy</span>
        <img
          src="https://img.icons8.com/ios-filled/50/medical-doctor.png"
          alt="Doctor Logo"
          className="logo"
        />
      </div>
      <ul className="nav-right">
        <li>
          <a href="./">Home</a>
        </li>
        {/* Changed this from <a> to <button> */}
        <li>
          <button className="signup-btn" onClick={onSignUpClick}>
            Sign Up
          </button>
        </li>
        <li>
          <button className="login-btn" onClick={onLoginClick}>
            Login
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
