import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import LandingPage from "./Components/LandingPage/LandingPage";
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';  

function App() {
  // State to control showing Login modal
  const [showLogin, setShowLogin] = useState(false);

  // State to control showing SignUp modal
  const [showSignUp, setShowSignUp] = useState(false);

  // Toggle login modal visibility, hide signup
  const toggleLogin = () => {
    setShowLogin(prev => !prev);
    setShowSignUp(false);
  };

  // Toggle signup modal visibility, hide login
  const toggleSignUp = () => {
    setShowSignUp(prev => !prev);
    setShowLogin(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* Pass toggle functions to Navbar */}
        <Navbar onLoginClick={toggleLogin} onSignUpClick={toggleSignUp} />

        {/* Conditionally render Login and SignUp modals */}
        {showLogin && <Login />}
        {showSignUp && <SignUp />}

        {/* Routes for main app pages */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
