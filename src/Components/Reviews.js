import React, { useEffect, useState } from "react";
import "./Reviews.css";
import ReviewForm from "./ReviewForm/ReviewForm";

const Reviews = () => {
  const [doctors, setDoctors] = useState([]);

  // Load doctor list for the table
  useEffect(() => {
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) =>
        console.error("Failed to fetch doctors for reviews:", err)
      );
  }, []);

  // Check if a review exists for the doctor
  const hasFeedback = (doctor) => {
    const key = `reviewFormData_${doctor.name}`;
    return !!localStorage.getItem(key);
  };

  // Save selected doctor so ReviewForm knows whom feedback is for
  const handleProvideFeedback = (doctor) => {
    localStorage.setItem("doctorData", JSON.stringify(doctor));
    // ReviewForm will load it automatically from localStorage
  };

  return (
    <div className="reviews-page">
      <h2>Doctor Reviews</h2>
      <p className="reviews-subtitle">
        Select a doctor to provide feedback about your consultation.
      </p>

      <div className="reviews-table-wrapper">
        <table className="reviews-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Specialty</th>
              <th>Provide Feedback</th>
              <th>Feedback Given</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor.id || doctor._id || index}>
                <td>{index + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.speciality || doctor.specialty}</td>

                <td>
                  <button
                    className="reviews-btn"
                    onClick={() => handleProvideFeedback(doctor)}
                  >
                    Click here
                  </button>
                </td>

                <td>{hasFeedback(doctor) ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review form appears below table */}
      <div className="reviews-form-section">
        <ReviewForm />
      </div>
    </div>
  );
};

export default Reviews;
