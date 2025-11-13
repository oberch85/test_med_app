import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ doctor, onSubmit, onCancel }) => {
  // Form state
  const [patientName, setPatientName] = useState("");
  const [slotType, setSlotType] = useState("time-slot"); // "time-slot" | "specific-date"
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!patientName || !date || !time) {
      alert("Please fill all fields before booking the appointment.");
      return;
    }

    // Build booking object
    const bookingData = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientName,
      slotType,
      date,
      time,
    };

    // Pass data upward to DoctorCard
    onSubmit && onSubmit(bookingData);
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <h3>Book Appointment with {doctor.name}</h3>

      {/* Patient Name */}
      <div className="form-group">
        <label>Patient Name</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      {/* Slot Type */}
      <div className="form-group">
        <label>Slot Type</label>
        <select
          value={slotType}
          onChange={(e) => setSlotType(e.target.value)}
        >
          <option value="time-slot">Book a Time Slot</option>
          <option value="specific-date">Book for Specific Date</option>
        </select>
      </div>

      {/* Appointment Date */}
      <div className="form-group">
        <label>Appointment Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Appointment Time */}
      <div className="form-group">
        <label>Appointment Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="form-buttons">
        <button type="submit" className="confirm-btn">
          Confirm Booking
        </button>

        <button
          type="button"
          className="cancel-btn"
          onClick={() => onCancel && onCancel()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
