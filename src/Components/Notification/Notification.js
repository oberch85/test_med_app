import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Notification.css";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // helper to load everything from storage
  const loadNotificationData = () => {
    const storedEmail = sessionStorage.getItem("email");

    if (storedEmail) {
      setIsLoggedIn(true);
      setUsername(storedEmail.split("@")[0]);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }

    const storedDoctorDataRaw = localStorage.getItem("doctorData");
    if (!storedDoctorDataRaw) {
      setDoctorData(null);
      setAppointmentData(null);
      setShowNotification(false);
      return;
    }

    try {
      const storedDoctorData = JSON.parse(storedDoctorDataRaw);
      setDoctorData(storedDoctorData);

      const appointmentRaw = localStorage.getItem(storedDoctorData.name);
      if (!appointmentRaw) {
        setAppointmentData(null);
        setShowNotification(false);
        return;
      }

      const storedAppointmentData = JSON.parse(appointmentRaw);
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    } catch (e) {
      console.error("Failed to parse notification data:", e);
      setDoctorData(null);
      setAppointmentData(null);
      setShowNotification(false);
    }
  };

  useEffect(() => {
    // initial load on mount
    loadNotificationData();

    // listen for custom events to refresh data
    const handler = () => loadNotificationData();
    window.addEventListener("appointmentChange", handler);

    return () => {
      window.removeEventListener("appointmentChange", handler);
    };
  }, []);

  const patientName = appointmentData?.patientName;
  const appointmentDate = appointmentData?.date;
  const appointmentTime = appointmentData?.time;

  return (
    <div className="notification-layout">
      <Navbar />
      <div className="notification-page-content">{children}</div>

      {isLoggedIn && showNotification && doctorData && appointmentData && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Confirmed</h3>
            <p className="appointment-card__message">
              <strong>Patient:</strong> {patientName || username}
            </p>
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {doctorData.name}</p>
            <p className="appointment-card__message">
              <strong>Date:</strong> {appointmentDate}</p>
            <p className="appointment-card__message">
              <strong>Time:</strong> {appointmentTime}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
