import React, { useEffect, useState } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  const [submittedReview, setSubmittedReview] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Load doctor + appointment from localStorage (same scheme as Notification)
  useEffect(() => {
    const storedDoctorRaw = localStorage.getItem("doctorData");
    if (!storedDoctorRaw) return;

    try {
      const storedDoctor = JSON.parse(storedDoctorRaw);
      setDoctorData(storedDoctor);

      const appointmentRaw = localStorage.getItem(storedDoctor.name);
      if (appointmentRaw) {
        const appt = JSON.parse(appointmentRaw);
        setAppointmentData(appt);

        // Check if a review already exists for this doctor
        const reviewKey = `reviewFormData_${storedDoctor.name}`;
        const storedReviewRaw = localStorage.getItem(reviewKey);
        if (storedReviewRaw) {
          const storedReview = JSON.parse(storedReviewRaw);
          setSubmittedReview(storedReview);
          setHasSubmitted(true);
          setShowForm(false);
        }
      }
    } catch (e) {
      console.error("Failed to parse stored review data:", e);
    }
  }, []);

  // Open form (if not already submitted)
  const handleOpenForm = () => {
    if (!hasSubmitted) {
      setShowForm(true);
    }
  };

  // Change handler for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setShowWarning(false);
  };

  // Rating click
  const handleRatingChange = (ratingValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: ratingValue,
    }));
    setShowWarning(false);
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.review || formData.rating <= 0) {
      setShowWarning(true);
      return;
    }

    const reviewToSave = {
      ...formData,
      doctorName: doctorData?.name || "",
      date: appointmentData?.date || "",
      time: appointmentData?.time || "",
    };

    setSubmittedReview(reviewToSave);
    setHasSubmitted(true);
    setShowForm(false);
    setShowWarning(false);

    // Save to localStorage with a key that Navbar cleans on logout
    if (doctorData?.name) {
      const reviewKey = `reviewFormData_${doctorData.name}`;
      localStorage.setItem(reviewKey, JSON.stringify(reviewToSave));
    }
  };

  // No appointment info → nothing to review
  if (!doctorData || !appointmentData) {
    return (
      <div className="review-form-wrapper">
        <h2>Review Your Consultation</h2>
        <p className="review-info">
          No completed appointment found. Please book and complete an appointment first.
        </p>
      </div>
    );
  }

  return (
    <div className="review-form-wrapper">
      <h2>Review Your Consultation</h2>

      {/* Show context about the consultation */}
      <div className="review-context">
        <p>
          <strong>Doctor:</strong> {doctorData.name}
        </p>
        <p>
          <strong>Speciality:</strong> {doctorData.speciality || doctorData.specialty}
        </p>
        <p>
          <strong>Date:</strong> {appointmentData.date}
        </p>
        <p>
          <strong>Time:</strong> {appointmentData.time}
        </p>
      </div>

      {/* Button to show form */}
      <div className="review-trigger">
        <button
          onClick={handleOpenForm}
          disabled={hasSubmitted}
          className="review-open-btn"
        >
          {hasSubmitted ? "Feedback submitted" : "Click here to provide feedback"}
        </button>
      </div>

      {/* Warning message if fields missing */}
      {showWarning && (
        <p className="warning">
          Please fill out all fields and select a rating before submitting.
        </p>
      )}

      {/* The feedback form */}
      {showForm && !hasSubmitted && (
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="review">Your feedback:</label>
            <textarea
              id="review"
              name="review"
              placeholder="Write your feedback here..."
              value={formData.review}
              onChange={handleChange}
            />
          </div>

          {/* Rating selector 1–5 */}
          <div className="form-group rating-group">
            <label>Rating:</label>
            <div className="rating-selector">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={
                    value <= formData.rating
                      ? "rating-btn rating-btn-selected"
                      : "rating-btn"
                  }
                  onClick={() => handleRatingChange(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit">Submit Review</button>
          </div>
        </form>
      )}

      {/* Submitted review preview */}
      {submittedReview && (
        <div className="review-output">
          <h3>Your Submitted Review</h3>
          <p>
            <strong>Name:</strong> {submittedReview.name}
          </p>
          <p>
            <strong>Rating:</strong> {submittedReview.rating} / 5
          </p>
          <p>
            <strong>Review:</strong> {submittedReview.review}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
