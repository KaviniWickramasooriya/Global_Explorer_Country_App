import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiMapPin, 
  FiUsers, 
  FiGlobe, 
  FiClock, 
  FiDollarSign,
  FiMap
} from 'react-icons/fi';
import './CountryDetailsPage.css';

const CountryDetailsPage = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!response.ok) throw new Error('Country not found');
        const data = await response.json();
        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountryData();
  }, [code]);

  if (loading) return (
    <div className="country-detail-loading">
      <div className="loading-spinner"></div>
      <p>Loading country data...</p>
    </div>
  );

  if (error) return (
    <div className="country-detail-error">
      <h3>{error}</h3>
      <Link to="/" className="return-btn">
        <FiArrowLeft /> Back to Home
      </Link>
    </div>
  );

  const getGoogleMapsLink = (latlng) => {
    if (!latlng || latlng.length !== 2) return null;
    return `https://www.google.com/maps?q=${latlng[0]},${latlng[1]}`;
  };

  const mapsLink = getGoogleMapsLink(country.latlng);

  return (
    <div className="country-detail-container">
      <motion.div 
        className="country-detail-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="background-overlay"></div>
      </motion.div>

      <div className="country-detail-content">
        <Link to="/allCountries" className="country-detail-back-btn">
          <FiArrowLeft /> Back to Countries
        </Link>

        <motion.div 
          className="country-detail-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>{country.name.common}</h1>
          <p className="country-official-name">{country.name.official}</p>
          {mapsLink && (
            <a 
              href={mapsLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-link-btn"
            >
              <FiMap /> View on Map
            </a>
          )}
        </motion.div>

        <div className="country-detail-grid">
          <motion.div 
            className="country-flag-container"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={country.flags.svg} 
              alt={`Flag of ${country.name.common}`} 
              className="country-flag-image"
            />
            {country.coatOfArms?.svg && (
              <div className="country-coat-of-arms">
                <img 
                  src={country.coatOfArms.svg} 
                  alt={`Coat of Arms of ${country.name.common}`}
                />
              </div>
            )}
          </motion.div>

          <motion.div 
            className="country-info-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="country-info-grid">
              <div className="country-info-card">
                <FiMapPin className="info-icon" />
                <div>
                  <h3>Location</h3>
                  <p><span>Region:</span> {country.region}</p>
                  <p><span>Subregion:</span> {country.subregion || 'N/A'}</p>
                  <p><span>Capital:</span> {country.capital?.join(', ') || 'N/A'}</p>
                </div>
              </div>

              <div className="country-info-card">
                <FiUsers className="info-icon" />
                <div>
                  <h3>People</h3>
                  <p><span>Population:</span> {country.population.toLocaleString()}</p>
                  <p><span>Demonym:</span> {country.demonyms?.eng?.m || 'N/A'}</p>
                  <p><span>Languages:</span> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                </div>
              </div>

              <div className="country-info-card">
                <FiGlobe className="info-icon" />
                <div>
                  <h3>Geography</h3>
                  <p><span>Area:</span> {country.area?.toLocaleString()} km²</p>
                  <p><span>Continent:</span> {country.continents?.join(', ') || 'N/A'}</p>
                </div>
              </div>

              <div className="country-info-card">
                <FiDollarSign className="info-icon" />
                <div>
                  <h3>Economy</h3>
                  <p><span>Currencies:</span> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
                  <p><span>Driving Side:</span> {country.car?.side || 'N/A'}</p>
                </div>
              </div>

              <div className="country-info-card">
                <FiClock className="info-icon" />
                <div>
                  <h3>Time</h3>
                  <p><span>Timezones:</span> {country.timezones?.join(', ') || 'N/A'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailsPage;