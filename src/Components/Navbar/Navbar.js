import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  // Extract username from email
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");

    if (storedEmail) {
      setIsLoggedIn(true);
      setEmail(storedEmail);
      const extractedUsername = storedEmail.split("@")[0];
      setUsername(extractedUsername);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    localStorage.removeItem("doctorData");

    // Remove reviewFormData from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("reviewFormData_")) {
        localStorage.removeItem(key);
      }
    }

    setIsLoggedIn(false);
    setEmail('');
    setUsername('');
    window.location.reload();
  };

  const handleClick = () => {
    alert('Logo clicked!');
  };

  return (
    <nav>
      <div className="nav-left">
        <span className="app-title">StayHealthy</span>
        <img
          src="https://img.icons8.com/ios-filled/50/medical-doctor.png"
          alt="Doctor Logo"
          className="logo"
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
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

        {isLoggedIn ? (
          <>
            <li>
              <span className="username">Hello, {username}</span>
            </li>
            <li>
              <button className="btn2" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </li>
            <li>
              <Link to="/login" className="login-btn">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
