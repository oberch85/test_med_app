import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import "./Login.css"; // Importing the CSS styles for the Landing_Page component  

// Defining the Function component Navbar
const Login = () => {

  // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  // Get navigation function from react-router-dom
  const navigate = useNavigate();
  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);
  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    // Parse the response JSON
    const json = await res.json();
    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);
      // Redirect to home page and reload the window
      navigate('/');
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  return (
    <div className="form-container">
    <p className="login-prompt">
      Don't have an account?
      <Link to="/signup" style={{ color: '#2190FF' }}>
                Sign Up Here
      </Link>
    </p>

    <h2>Login</h2>
    <form onSubmit={login}>

      <div className="form-group">
        <label htmlFor="email">Email Address:</label>
        {/* Input field for email */}
        <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            name="email" 
            id="email" 
            className="form-control" 
            placeholder="Enter your email" 
            aria-describedby="helpId" 
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 type="password"
                 name="password"
                 id="password"
                 className="form-control"
                 placeholder="Enter your password"
                 aria-describedby="helpId"
               />
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