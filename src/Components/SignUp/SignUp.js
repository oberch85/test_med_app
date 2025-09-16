import React from "react"; // Importing the necessary modules from React library

import "./SignUp.css"; // Importing the CSS styles for the Landing_Page component  

// Defining the Function component Navbar
const SignUp = () => {
  return (
    <div className="form-container">
    <p className="login-prompt">
      {/*Already a member? <a href="#">Login</a>*/}
    </p>

    <h2>Sign Up</h2>
    <form action="#" method="post">

      <div className="form-group">
        <label for="role">Role:</label>
        <select id="role" name="role" required>
          <option value="">-- Select your role --</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
      </div>

      <div className="form-group">
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" placeholder="Enter your full name" required />
      </div>

      <div className="form-group">
        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
      </div>

      <div className="form-group">
        <label for="email">Email Address:</label>
        <input type="email" id="email" name="email" placeholder="Enter your email address" required />
      </div>

      <div className="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Create a password" required />
      </div>

      <div className="form-buttons">
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>

    </form>
  </div>



    );
};

export default SignUp; // Exporting the Navbar component to be used in other parts of the application