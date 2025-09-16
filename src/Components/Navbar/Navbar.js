import React from "react"; // Importing the necessary modules from React library

import "./Navbar.css"; // Importing the CSS styles for the Landing_Page component  

// Defining the Function component Navbar
const Navbar = () => {
  return (
    <nav>
        <div className="nav-left">
            <span className="app-title">StayHealthy</span>
            <img src="https://img.icons8.com/ios-filled/50/medical-doctor.png" alt="Doctor Logo" className="logo" />
        </div>
        <ul className="nav-right">
            <li><a href="../Landing_Page/LandingPage.html">Home</a></li>
            <li><a href="#">Appointments</a></li>
            <li><a href="../Sign_Up/Sign_Up.html" className="signup-btn">Sign Up</a></li>
            <li><a href="../Login/Login.html" className="login-btn">Login</a></li>
        </ul>
    </nav>
    );
};

export default Navbar; // Exporting the Navbar component to be used in other parts of the application