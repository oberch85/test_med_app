import React, { useState } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

const DoctorCard = ({ doctor }) => {
  // Safely pull known fields from the API object
  const name = doctor?.name || "";
  const speciality = doctor?.speciality || doctor?.specialty || "";
  const experience = doctor?.experience || doctor?.yearsOfExperience || "";
  const rating = doctor?.rating || doctor?.ratings || "";

  const [showForm, setShowForm] = useState(false);
  const [booking, setBooking] = useState(null);

  const handleBookClick = () => {
    setShowForm(true);
  };

    const handleSubmit = (bookingData) => {
    setBooking(bookingData);
    setShowForm(false);

    localStorage.setItem("doctorData", JSON.stringify(doctor));
    localStorage.setItem(name, JSON.stringify(bookingData));

    // 🔹 notify Notification to refresh
    window.dispatchEvent(new Event("appointmentChange"));
    };

    const handleCancelBooking = () => {
    setBooking(null);

    localStorage.removeItem("doctorData");
    localStorage.removeItem(name);

    // 🔹 notify Notification to refresh
    window.dispatchEvent(new Event("appointmentChange"));
    };



  return (
    <div className="doctor-card">
      {/* Left side: optional image, if API has one */}
      {doctor?.image && (
        <div className="doctor-card-left">
          <img
            src={doctor.image}
            alt={name}
            className="doctor-image"
          />
        </div>
      )}

      <div className="doctor-card-details-container">
        <h3>{name}</h3>

        {speciality && (
          <p className="specialty">{speciality}</p>
        )}

        {experience && (
          <p className="experience">{experience} years experience</p>
        )}

        {rating && (
          <p className="rating">⭐ {rating} / 5</p>
        )}

        {doctor?.profile && (
          <p className="profile">{doctor.profile}</p>
        )}

        {/* BOOK APPOINTMENT BUTTON */}
        {!booking && (
          <button
            className="book-appointment-btn"
            onClick={handleBookClick}
          >
            <div>Book Appointment</div>
            <div className="no-fee">No Booking Fee</div>
          </button>
        )}

        {/* APPOINTMENT FORM */}
        {showForm && (
          <AppointmentForm
            doctor={doctor}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* BOOKING SUMMARY + CANCEL OPTION */}
        {booking && (
          <div className="doctor-card-options-container">
            <div className="booking-summary">
              <h4>Appointment Confirmed</h4>
              <p><strong>Patient:</strong> {booking.patientName}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Slot Type:</strong> {booking.slotType}</p>
            </div>

            <button
              className="cancel-appointment-btn"
              onClick={handleCancelBooking}
            >
              Cancel Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
