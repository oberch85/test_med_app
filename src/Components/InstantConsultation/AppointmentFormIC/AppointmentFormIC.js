import React, { useState } from 'react';

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber });
    setName('');
    setPhoneNumber('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form" noValidate>
      <h3>Book an appointment with Dr. {doctorName} ({doctorSpeciality})</h3>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          autoComplete="name"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          autoComplete="tel"
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+1 (555) 123-4567"
          pattern="^\+?[0-9\s\-]{7,15}$"
          title="Please enter a valid phone number"
          required
        />
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentFormIC;
