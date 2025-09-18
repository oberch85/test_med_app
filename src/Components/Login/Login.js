import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import "./Login.css";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  // Optional for inline errors
  const [errors, setErrors] = useState([]);
  // Optional for loading state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    setErrors([]); // clear previous errors

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);
        navigate('/');
      } else {
        if (json.errors) {
          setErrors(json.errors.map(err => err.msg));
          // Alternatively alert errors:
          // json.errors.forEach(err => alert(err.msg));
        } else {
          setErrors([json.error]);
          // or alert(json.error);
        }
      }
    } catch (error) {
      setErrors(["Something went wrong. Please try again later."]);
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <p className="login-prompt">
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: '#2190FF' }}>
          Sign Up Here
        </Link>
      </p>

      <h2>Login</h2>

      {/* Display errors inline */}
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((err, idx) => (
            <p key={idx} style={{ color: 'red' }}>{err}</p>
          ))}
        </div>
      )}

      <form onSubmit={login}>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
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
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <button
            type="reset"
            onClick={() => {
              setEmail('');
              setPassword('');
              setErrors([]);
            }}
          >
            Reset
          </button>
        </div>
      </form>

      <p className="forgot-password">
        {/*<a href="#">Forgot your password?</a>*/}
      </p>
    </div>
  );
};

export default Login;
