import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");

    if (storedEmail) {
      setIsLoggedIn(true);
      setUsername(storedEmail.split("@")[0]);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");

    localStorage.removeItem("doctorData");

    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("reviewFormData_")) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav>
      <div className="nav-left">
        <Link to="/" className="app-title">
          StayHealthy
        </Link>
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
          <Link to="/book-appointment">Book Appointment</Link>
        </li>

        <li>
          <Link to="/instant-consultation">Instant Consultation</Link>
        </li>

        <li>
          <Link to="/reviews">Reviews</Link>
        </li>

        {isLoggedIn ? (
          <>
            {/* Dropdown under username */}
            <li className="nav-user-dropdown">
              <button className="nav-user-btn">
                Hello, {username} ▾
              </button>
              <div className="nav-user-menu">
                <Link to="/profile">Profile</Link>
                <Link to="/reports">Your Reports</Link>
              </div>
            </li>

            <li>
              <button className="btn2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" className="login-btn">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
