// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Navbar from './Components/Navbar/Navbar';
import BookingConsultation from './Components/BookingConsultation';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
// Import other components as needed (Home, HealthBlog, Reviews, etc.)

// src/pages/Home.js (or inline)
const Home = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    textAlign: 'center'
  }}>
    <h1>Welcome to StayHealthy Home Page</h1>
  </div>
);



const HealthBlog = () => <h1>Health Blog</h1>;
const Reviews = () => <h1>Reviews</h1>;
const Appointments = () => <h1>Appointments</h1>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instant-consultation" element={<BookingConsultation />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search/doctors" element={<Appointments />} />
        <Route path="/healthblog" element={<HealthBlog />} />
        <Route path="/reviews" element={<Reviews />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
