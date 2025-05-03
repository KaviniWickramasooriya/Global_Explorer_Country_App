import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiGlobe, FiArrowRight } from 'react-icons/fi';
import { PuffLoader } from 'react-spinners';
import Navbar from '../../components/Navbar';
import './SearchCountryPage.css';

const SearchCountry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    
    fetch(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then(response => {
        if (!response.ok) throw new Error('No matching countries found');
        return response.json();
      })
      .then(data => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setSearchResults([]);
        setLoading(false);
      });
  };

  return (
    <div className="search-page">
      <Navbar />
      
      <div className="search-container">
        <motion.div 
          className="search-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FiGlobe className="globe-icon" />
          <h1>Discover Countries</h1>
          <p>Search for any country by its name</p>
        </motion.div>

        <motion.form 
          className="search-bar"
          onSubmit={handleSearch}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="search-input-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Type a country name (e.g., Canada, Japan)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FiArrowRight className="arrow-icon" />
            </button>
          </div>
        </motion.form>

        {loading && (
          <div className="loader-container">
            <PuffLoader color="#e94560" size={80} />
            <p>Discovering countries...</p>
          </div>
        )}

        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <div className="results-grid">
          {searchResults.map((country, index) => (
            <motion.div 
              className="country-card"
              key={country.cca3}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="flag-container">
                <img 
                  src={country.flags.png} 
                  alt={`Flag of ${country.name.common}`} 
                  className="country-flag"
                />
              </div>
              <div className="country-info">
                <h3>{country.name.common}</h3>
                <div className="country-details">
                  <p><span>Capital:</span> {country.capital?.[0] || 'N/A'}</p>
                  <p><span>Population:</span> {country.population.toLocaleString()}</p>
                  <p><span>Region:</span> {country.region}</p>
                </div>
                <Link to={`/country/${country.cca3}`} className="details-link">
                  Explore more <FiArrowRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCountry;