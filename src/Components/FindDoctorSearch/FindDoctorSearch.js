import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
  'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist',
  'Ear-nose-throat (ENT) Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearch = () => {
  const [searchDoctor, setSearchDoctor] = useState('');
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const navigate = useNavigate();

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    navigate(`/instant-consultation?speciality=${encodeURIComponent(speciality)}`);
  };

  const visibleSpecialities = initSpeciality.filter(speciality =>
    speciality.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  return (
    <div className="finddoctor">
      <div style={{ textAlign: 'center' }}>
        <h1>Find a doctor and consult instantly</h1>
        <div>
          <i className="fa fa-user-md" style={{ color: '#000000', fontSize: '10rem' }}></i>
        </div>

        <div className="home-search-container">
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              value={searchDoctor}
              onChange={(e) => {
                setSearchDoctor(e.target.value);
                setDoctorResultHidden(false);
              }}
              onFocus={() => setDoctorResultHidden(false)}
              onBlur={() => setTimeout(() => setDoctorResultHidden(true), 150)}
            />

            <div className="findiconimg">
              <img className="findIcon" src={process.env.PUBLIC_URL + '/images/search.svg'} alt="Search" />
            </div>

            {!doctorResultHidden && (
              <div className="search-doctor-input-results">
                {visibleSpecialities.length > 0 ? (
                  visibleSpecialities.map(speciality => (
                    <div
                      className="search-doctor-result-item"
                      key={speciality}
                      onMouseDown={() => handleDoctorSelect(speciality)}
                    >
                      <span>
                        <img
                          src={process.env.PUBLIC_URL + '/images/search.svg'}
                          alt=""
                          style={{ height: "10px", width: "10px" }}
                        />
                      </span>
                      <span>{speciality}</span>
                      <span>SPECIALITY</span>
                    </div>
                  ))
                ) : (
                  <div className="search-doctor-result-item">No matches found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDoctorSearch;