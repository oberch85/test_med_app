import React, { useState } from "react";
import "./FindDoctorSearch.css";

const SPECIALTIES = [
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Dentist",
  "Neurologist",
  "Orthopedic Surgeon",
  "Psychiatrist",
  "Gynecologist",
  "Ophthalmologist",
  "General Physician",
];

const FindDoctorSearch = ({ onSearchChange }) => {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSelect = (spec) => {
    setQuery(spec);
    if (onSearchChange) {
      onSearchChange(spec);
    }
    setShowList(false);
  };

  const filteredSpecialties = SPECIALTIES.filter((spec) =>
    spec.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="find-doctor-search">
      <label className="find-doctor-label">Find a Doctor by Specialty</label>

      <div className="find-doctor-input-wrapper">
        <input
          type="text"
          placeholder="e.g. Cardiologist"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowList(true)}
          onBlur={() => setTimeout(() => setShowList(false), 150)}
          className="find-doctor-input"
        />

        {showList && filteredSpecialties.length > 0 && (
          <ul className="specialty-dropdown">
            {filteredSpecialties.map((spec) => (
              <li
                key={spec}
                className="specialty-item"
                onMouseDown={() => handleSelect(spec)}
              >
                {spec}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FindDoctorSearch;
