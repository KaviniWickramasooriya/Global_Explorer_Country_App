import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PuffLoader } from 'react-spinners';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaUsers, FaGlobe } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Authentication Required',
        text: 'Please login to view your saved countries',
        icon: 'info',
        background: '#1a1a2e',
        color: '#fff',
        confirmButtonText: 'Login',
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    const fetchFavorites = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'https://global-explorer-lac.vercel.app/api';
        const response = await axios.get(`${apiUrl}/users/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const favoriteCountries = await Promise.all(
          response.data.favorites.map(async (cca3) => {
            const countryResponse = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
            const data = await countryResponse.json();
            return data[0];
          })
        );
        
        setFavorites(favoriteCountries);
        setLoading(false);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || 'Failed to load favorites',
          icon: 'error',
          background: '#1a1a2e',
          color: '#fff',
        });
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate]);

  const handleRemoveFavorite = async (cca3) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.REACT_APP_API_URL || 'https://global-explorer-lac.vercel.app/api';
      await axios.delete(`${apiUrl}/users/favorites/${cca3}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setFavorites(favorites.filter(country => country.cca3 !== cca3));
      
      Swal.fire({
        title: 'Removed',
        text: 'Country removed from favorites',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#1a1a2e',
        color: '#fff',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Failed to remove favorite',
        icon: 'error',
        background: '#1a1a2e',
        color: '#fff',
      });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
    }
  };

  if (loading) {
    return (
      <div className="favorites-loading-container">
        <PuffLoader color="#e94560" size={80} />
        <p className="favorites-loading-text">Loading your favorites...</p>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <Navbar />
      
      <div className="favorites-hero">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Your Favorite Destinations
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {favorites.length > 0 
            ? `You have ${favorites.length} saved countries` 
            : 'Start building your travel bucket list'}
        </motion.p>
      </div>

      <div className="favorites-container">
        {favorites.length > 0 ? (
          <div className="favorites-grid">
            {favorites.map((country, index) => (
              <motion.div
                className="favorite-card"
                key={country.cca3}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
                layout
              >
                <div className="favorite-card-image">
                  <img 
                    src={country.flags.svg} 
                    alt={`Flag of ${country.name.common}`} 
                  />
                  <button 
                    className="favorite-remove-btn"
                    onClick={() => handleRemoveFavorite(country.cca3)}
                    title="Remove from favorites"
                  >
                    <FaHeart className="filled-heart" />
                  </button>
                </div>
                <div className="favorite-card-content">
                  <h3>{country.name.common}</h3>
                  <div className="favorite-card-details">
                    <p><FaMapMarkerAlt className="detail-icon" /> {country.capital?.[0] || 'N/A'}</p>
                    <p><FaUsers className="detail-icon" /> {country.population.toLocaleString()}</p>
                    <p><FaGlobe className="detail-icon" /> {country.region}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="favorites-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaRegHeart className="empty-heart-icon" />
            <h3>No favorites yet</h3>
            <p>Explore countries and add them to your favorites</p>
            <button 
              className="explore-btn"
              onClick={() => navigate('/allCountries')}
            >
              Explore Countries
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;