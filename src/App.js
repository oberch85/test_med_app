// Import necessary modules from React library
import React from "react";

// Import React Router components for client-side routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import global styles (optional, but typical for CRA)
import "./App.css";

// Layout wrapper with Navbar + notification bar
import Notification from "./Components/Notification/Notification";

// Import custom components (pages)
import LandingPage from "./Components/LandingPage/LandingPage";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import InstantConsultation from "./Components/InstantConsultation/InstantConsultation";
import BookingConsultation from "./Components/BookingConsultation";
import Reviews from "./Components/Reviews";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Notification wraps all routes and renders Navbar + notification banner */}
        <Notification>
          <Routes>
            {/* Home / Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Authentication */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* Instant Consultation feature */}
            <Route
              path="/instant-consultation"
              element={<InstantConsultation />}
            />

            {/* Appointment Booking feature */}
            <Route
              path="/book-appointment"
              element={<BookingConsultation />}
            />

            {/* Reviews / Feedback */}
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;
