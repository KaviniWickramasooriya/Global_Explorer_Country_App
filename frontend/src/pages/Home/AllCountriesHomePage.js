import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBookmark, FaSearch } from 'react-icons/fa';
import { PuffLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import './AllCountriesHomePage.css';

const AllCountriesHomePage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeLanguage, setActiveLanguage] = useState('all');
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);

        // Extract unique languages from all countries
        const allLanguages = new Set();
        data.forEach(country => {
          if (country.languages) {
            Object.values(country.languages).forEach(lang => allLanguages.add(lang));
          }
        });
        setLanguages(['all', ...Array.from(allLanguages).sort()]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    let filtered = countries;
    
    // Search by country name
    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by region
    if (activeFilter !== 'all') {
      filtered = filtered.filter(country => country.region === activeFilter);
    }

    // Filter by language
    if (activeLanguage !== 'all') {
      filtered = filtered.filter(country => 
        country.languages && Object.values(country.languages).includes(activeLanguage)
      );
    }

    setFilteredCountries(filtered);
  }, [searchTerm, countries, activeFilter, activeLanguage]);

  const handleAddFavorite = async (cca3) => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Authentication Required',
        text: 'Please login to bookmark countries',
        icon: 'info',
        confirmButtonText: 'Login',
        background: '#1a1a2e',
        color: '#fff'
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://global-explorer-lac.vercel.app/api';
      await axios.post(
        `${apiUrl}/users/favorites`,
        { cca3 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        title: 'Bookmarked!',
        text: 'Country added to your collection',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#1a1a2e',
        color: '#fff'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Failed to bookmark country',
        icon: 'error',
        background: '#1a1a2e',
        color: '#fff'
      });
    }
  };

  const regions = ['all', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctica'];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <PuffLoader color="#e94560" size={80} />
        <p className="loading-text">Discovering the world...</p>
      </div>
    );
  }

  return (
    <div className="countries-page">
      <Navbar />
      
      <div className="countries-hero">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Global Explorer
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Discover {countries.length} countries across the planet
        </motion.p>
      </div>

      <div className="countries-container">
        <div className="countries-controls">
          <motion.div 
            className="search-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          <motion.div 
            className="filter-buttons"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {regions.map(region => (
              <button
                key={region}
                className={activeFilter === region ? 'active' : ''}
                onClick={() => setActiveFilter(region)}
              >
                {region === 'all' ? 'All Regions' : region}
              </button>
            ))}
          </motion.div>

          <motion.div 
            className="filter-buttons"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <select
              value={activeLanguage}
              onChange={(e) => setActiveLanguage(e.target.value)}
              className={activeLanguage === 'all' ? '' : 'active'}
            >
              {languages.map(language => (
                <option key={language} value={language}>
                  {language === 'all' ? 'All Languages' : language}
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        <div className = "countries-grid">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <motion.div
                className="country-card"
                key={country.cca3}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index % 20}
                layout
              >
                <div className="card-image">
                  <img src={country.flags.png} alt={country.name.common} />
                  <button 
                    className="bookmark-btn"
                    onClick={() => handleAddFavorite(country.cca3)}
                    title="Bookmark this country"
                  >
                    <FaBookmark />
                  </button>
                </div>
                <div className="card-content">
                  <h3>{country.name.common}</h3>
                  <div className="country-info">
                    <p><span>Region:</span> {country.region}</p>
                    <p><span>Capital:</span> {country.capital?.[0] || 'N/A'}</p>
                    <p><span>Population:</span> {country.population.toLocaleString()}</p>
                  </div>
                  <Link to={`/country/${country.cca3}`} className="details-btn">
                    Explore Details
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>No countries found</h3>
              <p>Try adjusting your search or filter</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCountriesHomePage;