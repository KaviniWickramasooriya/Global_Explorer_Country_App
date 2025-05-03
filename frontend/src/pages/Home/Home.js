import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Globe from '../../assets/explore.avif';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-background"></div>
      
      <div className="home-content">
        <motion.div 
          className="home-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="home-title">
            World Explorer
          </h1>
          
          <p className="home-subtitle">
            Your digital passport to global discovery
          </p>
          
          <div className="home-features">
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="feature-icon">🗺️</div>
              <p>Browse 250+ countries</p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="feature-icon">🔍</div>
              <p>Advanced search tools</p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="feature-icon">📊</div>
              <p>Detailed statistics</p>
            </motion.div>
          </div>
          
          <motion.div 
            className="home-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/allCountries"
              className="cta-button1 explore-btn"
              style={{
                background: 'linear-gradient(to right, #00d2ff, #3a7bd5)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(0, 210, 255, 0.3)'
              }}
            >
              Start Exploring
            </Link>

            <Link
              to="/search"
              className="cta-button1 search-btn"
              style={{
                background: 'transparent',
                color: '#00d2ff',
                border: '2px solid #00d2ff'
              }}
            >
              Quick Search
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="home-visual"
          initial={{ opacity: 0, rotate: -30 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: 'spring' }}
        >
          <img src={Globe} alt="Rotating globe" className="globe-image" />
          <div className="globe-glow"></div>
        </motion.div>
      </div>
      
      <div className="home-footer">
        <p>Powered by REST Countries API | © 2025 World Explorer</p>
      </div>
    </div>
  );
};

export default Home;