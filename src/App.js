import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  const [showLogin, setShowLogin] = useState(false); // default false
  const [showSignUp, setShowSignUp] = useState(false); // default false

  const toggleLogin = () => {
    setShowLogin(prev => !prev);
    setShowSignUp(false);
  };

  const toggleSignUp = () => {
    setShowSignUp(prev => !prev);
    setShowLogin(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar onLoginClick={toggleLogin} onSignUpClick={toggleSignUp} />

        {/* Conditionally show Login/SignUp based on user interaction */}
        {showLogin && <Login />}
        {showSignUp && <SignUp />}

        {/* Show Landing Page by default on "/" route */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
