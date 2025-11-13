import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./BookingConsultation.css";
import FindDoctorSearch from "./FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "./DoctorCard/DoctorCard";

const BookingConsultation = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // read query params like ?speciality=Cardiologist
  const [searchParams] = useSearchParams();

  // Helper: filter doctors by specialty text
  const filterDoctors = (list, text) => {
    if (!text) {
      setFilteredDoctors(list);
      return;
    }

    const lower = text.toLowerCase();
    const result = list.filter((doc) =>
      (doc.specialty || doc.speciality || "").toLowerCase().includes(lower)
    );

    setFilteredDoctors(result);
  };

  // Fetch doctor data on mount / param change
  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);

        // Check if there's a speciality in the URL query params
        const specialtyParam = searchParams.get("speciality");
        if (specialtyParam) {
          filterDoctors(data, specialtyParam);
        } else {
          // no query param → show all
          filterDoctors(data, "");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch doctors");
        setLoading(false);
      });
  }, [searchParams]);

  // When user types/selects in FindDoctorSearch
  const handleSearchChange = (value) => {
    filterDoctors(doctors, value);
  };

  return (
    <div className="instant-consultation-container">
      <h2 className="instant-consultation-title">Book an Appointment</h2>
      <p className="instant-consultation-subtitle">
        Search for a doctor by specialty and book a convenient appointment
        instantly.
      </p>

      {/* Search bar */}
      <FindDoctorSearch onSearchChange={handleSearchChange} />

      {/* Loading / error states */}
      {loading && <p>Loading doctors...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Doctor cards */}
      {!loading && !error && (
        <div className="doctor-cards-container">
          {filteredDoctors.length === 0 ? (
            <p className="no-doctors-message">
              No doctors found for this specialty. Try another search term.
            </p>
          ) : (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id || doctor._id} doctor={doctor} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BookingConsultation;
