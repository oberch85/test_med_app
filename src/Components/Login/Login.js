import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate('/');
    }
  }, [navigate]);

  // Client-side validation
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);

        navigate('/');
        window.location.reload();
      } else {
        if (json.errors && Array.isArray(json.errors)) {
          const backendErrors = {};
          json.errors.forEach(err => {
            backendErrors[err.param] = err.msg;
          });
          setErrors(backendErrors);
        } else {
          setErrors({ general: json.error || "Login failed" });
        }
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
    }
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setErrors({});
  };

  return (
    <div className="form-container">
      <p className="login-prompt">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>

      <h2>Login</h2>

      {errors.general && (
        <div className="error-text" style={{ marginBottom: '1rem' }}>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailError"
          />
          {errors.email && (
            <span className="error-text" id="emailError">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="passwordError"
          />
          {errors.password && (
            <span className="error-text" id="passwordError">
              {errors.password}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit">Login</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
