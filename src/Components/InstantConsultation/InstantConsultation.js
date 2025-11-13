import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./InstantConsultation.css";

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Alice Smith",
    specialty: "General Physician",
    experience: 10,
    rating: 4.7,
  },
  {
    id: 2,
    name: "Dr. Bob Brown",
    specialty: "Dermatologist",
    experience: 7,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Dr. Clara Johnson",
    specialty: "Pediatrician",
    experience: 9,
    rating: 4.8,
  },
];

const InstantConsultation = () => {
  const [search, setSearch] = useState("");

  const filteredDoctors = DOCTORS.filter((doc) =>
    `${doc.name} ${doc.specialty}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="instant-consultation-container">
      <h2 className="instant-consultation-title">Instant Consultation</h2>
      <p className="instant-consultation-subtitle">
        Choose a doctor and start a video or chat consultation immediately.
      </p>

      {/* Search bar */}
      <div className="instant-search">
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Doctor list */}
      <div className="instant-doctors">
        {filteredDoctors.length === 0 ? (
          <p className="no-doctors-message">
            No doctors found. Try another search term.
          </p>
        ) : (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="instant-doctor-card">
              <h3>{doctor.name}</h3>
              <p className="doctor-specialty">{doctor.specialty}</p>
              <p className="doctor-meta">
                {doctor.experience} years experience • ⭐ {doctor.rating}/5
              </p>

              <Popup
                trigger={
                  <button className="instant-btn">
                    Start Consultation
                  </button>
                }
                modal
                nested
              >
                {(close) => (
                  <div className="instant-modal">
                    <h3>Connecting you to {doctor.name}...</h3>
                    <p>
                      Please stay on this page while we set up your instant
                      consultation.
                    </p>
                    <ul className="instant-modal-list">
                      <li>Secure video / audio connection</li>
                      <li>No booking fee</li>
                      <li>Medical history ready for the doctor</li>
                    </ul>
                    <button className="instant-close-btn" onClick={close}>
                      Close
                    </button>
                  </div>
                )}
              </Popup>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InstantConsultation;
