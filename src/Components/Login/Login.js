import React from "react"; // Importing the necessary modules from React library

import "./Login.css"; // Importing the CSS styles for the Landing_Page component  

// Defining the Function component Navbar
const Login = () => {
  return (
    <div className="form-container">
    <p className="login-prompt">
      {/*Don't have an account? <a href="#">Sign Up</a>*/}
    </p>

    <h2>Login</h2>
    <form action="#" method="post">

      <div className="form-group">
        <label for="email">Email Address:</label>
        <input type="email" id="email" name="email" placeholder="Enter your email address" required />
      </div>

      <div className="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required />
      </div>

      <div className="form-buttons">
        <button type="submit">Login</button>
        <button type="reset">Reset</button>
      </div>

    </form>

    <p className="forgot-password">
      {/*<a href="#">Forgot your password?</a>*/}
    </p>
  </div>

    );
};

export default Login; // Exporting the Navbar component to be used in other parts of the application