import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../config';
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showerr, setShowerr] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!role || !name || !email || !password) {
      setShowerr("Please fill all required fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setShowerr("Please enter a valid email address.");
      return;
    }

    setShowerr('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone, role }),
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
        if (json.errors) {
          const allErrors = json.errors.map(error => error.msg).join(', ');
          setShowerr(allErrors);
        } else {
          setShowerr(json.error);
        }
      }
    } catch (err) {
      setShowerr("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <p className="login-prompt">
        Already a member? <Link to="/login" style={{ color: '#2190FF' }}>Login here</Link>
      </p>

      <h2>Sign Up</h2>

      {showerr && <div className="err" style={{ color: 'red', marginBottom: '10px' }}>{showerr}</div>}

      <form method="POST" onSubmit={register}>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={role} onChange={e => setRole(e.target.value)} required>
            <option value="">-- Select your role --</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            aria-describedby="helpId"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            type="tel"
            name="phone"
            id="phone"
            className="form-control"
            placeholder="Enter your phone number"
            aria-describedby="helpId"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter your email address"
            aria-describedby="helpId"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            aria-describedby="helpId"
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
          <button
            type="reset"
            onClick={() => {
              setName('');
              setEmail('');
              setPhone('');
              setPassword('');
              setRole('');
              setShowerr('');
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
