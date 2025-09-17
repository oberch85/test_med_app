import React, { useState } from "react"; // Importing the necessary modules from React library
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import "./SignUp.css"; // Importing the CSS styles for the Landing_Page component  

// Defining the Function component Navbar
const SignUp = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
                role: role
            }),
        });
        const json = await response.json(); // Parse the response JSON
        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg); // Show error messages
                }
            } else {
                setShowerr(json.error);
            }
        }
        };

    return (
        <div className="form-container">
        <p className="login-prompt">
        {/*Already a member? <a href="#">Login</a>*/}
        </p>

        <h2>Sign Up</h2>
        <form method="POST" onSubmit={register}>

        <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">-- Select your role --</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="name" name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
        </div>

        <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" />
            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
        </div>

        <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email address" aria-describedby="helpId" />
            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
        </div>

        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
        </div>

        <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
        </div>

        </form>
    </div>



    );
};

export default SignUp; // Exporting the signup component to be used in other parts of the application