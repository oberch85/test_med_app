import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onLoginClick, onSignUpClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    localStorage.removeItem("doctorData");

    // Clear review form data from localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("reviewFormData_")) {
        localStorage.removeItem(key);
      }
    });

    setIsLoggedIn(false);
    setUsername("");

    // Option 1: navigate without reload (comment out if undesired)
    navigate('/');

    // Option 2: full page reload (comment out if using navigate)
    // window.location.reload();
  };

  useEffect(() => { 
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setIsLoggedIn(true);
      setUsername(storedEmail);
    }
  }, []);

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
          {/* Changed to lowercase path */}
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search/doctors">Appointments</Link>
        </li>
        <li>
          <Link to="/healthblog">Health Blog</Link>
        </li>
        <li>
          <Link to="/reviews">Reviews</Link>
        </li>
        <li>
          {/* Changed to lowercase path */}
          <Link to="/instant-consultation">Instant Booking Consultation</Link>
        </li>
        {isLoggedIn ? (
          <>
            {/* Show only part before @ */}
            <li className="user-info">Welcome, {username.split('@')[0]}</li>
            <li className="link">
              <button className="btn2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
