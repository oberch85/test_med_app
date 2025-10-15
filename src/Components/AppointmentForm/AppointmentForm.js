import React, { useState } from 'react';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const availableSlots = [
    '10:00 AM - 10:30 AM',
    '11:00 AM - 11:30 AM',
    '02:00 PM - 02:30 PM',
    '03:00 PM - 03:30 PM',
  ];

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phoneNumber)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!selectedSlot) {
      alert('Please select a time slot.');
      return;
    }

    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }

    onSubmit({ name, phoneNumber, selectedSlot, selectedDate });
    setName('');
    setPhoneNumber('');
    setSelectedSlot(null);
    setSelectedDate('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <h3>Booking appointment with Dr. {doctorName} ({doctorSpeciality})</h3>

      <div className="form-group">
        <label htmlFor="name">Your Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          placeholder="10-digit phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          pattern="\d{10}"
          maxLength={10}
          autoComplete="tel"
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Select Date:</label>
        <input
          type="date"
          id="appointmentDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
          min={new Date().toISOString().split('T')[0]} // disables past dates
        />
      </div>

      <div className="form-group">
        <label>Select Time Slot:</label>
        <div className="slot-options">
          {availableSlots.map((slot) => (
            <button
              type="button"
              key={slot}
              className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
              onClick={() => handleSlotSelection(slot)}
              aria-pressed={selectedSlot === slot}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!selectedSlot || !name.trim() || !/^\d{10}$/.test(phoneNumber) || !selectedDate}
      >
        Book Now
      </button>
    </form>
  );
};

export default AppointmentForm;
