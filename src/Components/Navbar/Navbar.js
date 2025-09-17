import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onLoginClick, onSignUpClick }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        // setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        window.location.reload();
    }

    useEffect(() => { 
      const storedemail = sessionStorage.getItem("email");

      if (storedemail) {
            setIsLoggedIn(true);
            setUsername(storedemail);
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
        {/* Changed this from <a> to <button> */}
        {isLoggedIn?(
            <>
            <li className="user-info">Welcome, {username}</li>
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
