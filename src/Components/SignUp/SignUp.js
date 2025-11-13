import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const SignUp = () => {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState([]); 
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(phone)) {
      setShowerr(['Phone number must be exactly 10 digits']);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, name, email, password, phone }),
      });

      const json = await response.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);

        navigate("/");
        window.location.reload();
      } else {
        if (json.errors && Array.isArray(json.errors)) {
          setShowerr(json.errors.map(err => err.msg));
        } else {
          setShowerr([json.error || "Registration failed"]);
        }
      }
    } catch (error) {
      setShowerr(["Network error. Please try again."]);
    }
  };

  return (
    <div className="form-container">
      <p className="login-prompt">
        Already a member? <Link to="/login">Login</Link>
      </p>

      <h2>Sign Up</h2>

      <form onSubmit={register}>
        {/* Role */}
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">-- Select your role --</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Error messages */}
        {showerr.length > 0 && (
          <div className="error-list">
            {showerr.map((msg, index) => (
              <div key={index} className="error-text">
                {msg}
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="reset" onClick={() => setShowerr([])}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
