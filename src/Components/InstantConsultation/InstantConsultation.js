import React, { useEffect, useState, useCallback } from 'react';
import './InstantConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDoctorsDetails = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch doctors');
        return res.json();
      })
      .then(data => {
        setDoctors(data);
        if (searchParams.get('speciality')) {
          const filtered = data.filter(
            doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
        } else {
          setFilteredDoctors([]);
          setIsSearched(false);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredDoctors([]);
      setIsSearched(false);
      return;
    }

    const filtered = doctors.filter(doctor =>
      doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredDoctors(filtered);
    setIsSearched(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getDoctorsDetails();
    // Uncomment to require auth
    /*
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    }
    */
  }, [getDoctorsDetails, navigate]);

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearchIC onSearch={handleSearch} />
        <div className="search-results-container">
          {loading && <p>Loading doctors...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {isSearched && !loading && !error && (
            <center>
              <h2>{filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} available {searchParams.get('location') || ''}</h2>
              <h3>Book appointments with minimum wait-time & verified doctor details</h3>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(doctor => (
                  <DoctorCardIC className="doctorcard" {...doctor} key={doctor.id || doctor.name} />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          )}
        </div>
      </div>
    </center>
  );
};

export default InstantConsultation;
