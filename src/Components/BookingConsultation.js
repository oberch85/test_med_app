import React, { useEffect, useState } from 'react';
import './BookingConsultation.css';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';

const BookingConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch doctor data
  useEffect(() => {
    setLoading(true);
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        const specialtyParam = searchParams.get('speciality');
        if (specialtyParam) {
          setSearchText(specialtyParam);
          filterDoctors(data, specialtyParam);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch doctors');
        setLoading(false);
      });
  }, [searchParams]);

  const filterDoctors = (list, text) => {
    const filtered = list.filter(doc =>
      doc.speciality.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    filterDoctors(doctors, text);
  };

  return (
    <div className="searchpage-container">
      <FindDoctorSearch onSearch={handleSearch} />

      {loading && <p>Loading doctors...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && filteredDoctors.length > 0 && (
        <div className="search-results-container">
          <h2>{filteredDoctors.length} doctors available</h2>
          <h3>Book appointments with minimum wait-time</h3>
          {filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.name} {...doctor} />
          ))}
        </div>
      )}

      {!loading && searchText && filteredDoctors.length === 0 && (
        <p>No doctors found for "{searchText}".</p>
      )}
    </div>
  );
};

export default BookingConsultation;
