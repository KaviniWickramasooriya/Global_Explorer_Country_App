import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCompass, FiSearch, FiGlobe, FiHeart, FiUser, FiLogOut } from 'react-icons/fi';
import { RiEarthLine } from 'react-icons/ri';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    // Small animation effect on logout
    document.documentElement.style.setProperty('--nav-bg', '#e94560');
    setTimeout(() => {
      document.documentElement.style.setProperty('--nav-bg', '#16213e');
    }, 500);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-brand">
        <Link to="/" className="logo-link">
          <RiEarthLine className="logo-icon" />
          <span className="logo-text">Global Explorer</span>
        </Link>
      </div>

      <nav className="navbar-links">
        <div className="nav-group">
          <Link to="/" className="nav-link">
            <FiCompass className="nav-icon" />
            <span>Explore</span>
          </Link>
          <Link to="/allCountries" className="nav-link">
            <FiGlobe className="nav-icon" />
            <span>Countries</span>
          </Link>
          <Link to="/search" className="nav-link">
            <FiSearch className="nav-icon" />
            <span>Search</span>
          </Link>
        </div>

        <div className="nav-group">
          {isLoggedIn ? (
            <>
              <Link to="/favorites" className="nav-link">
                <FiHeart className="nav-icon" />
                <span>Favorites</span>
              </Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                <FiLogOut className="nav-icon" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                <FiUser className="nav-icon" />
                <span>Login</span>
              </Link>
              <Link to="/register" className="nav-link register-btn">
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </nav>

      <style jsx>{`
        :root {
          --nav-bg: #16213e;
          --nav-accent: #e94560;
          --nav-text: #ffffff;
          --nav-hover: rgba(255, 255, 255, 0.1);
        }

        .navbar-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: var(--nav-bg);
          color: var(--nav-text);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 2rem;
          z-index: 1000;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
          transition: background-color 0.5s ease;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
        }

        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--nav-text);
          font-weight: 600;
          font-size: 1.3rem;
          transition: transform 0.3s ease;
        }

        .logo-link:hover {
          transform: scale(1.05);
        }

        .logo-icon {
          font-size: 1.8rem;
          margin-right: 0.5rem;
          color: var(--nav-accent);
        }

        .logo-text {
          background: linear-gradient(to right, #fff, #e94560);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .navbar-links {
          display: flex;
          gap: 2rem;
        }

        .nav-group {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          border-radius: 30px;
          text-decoration: none;
          color: var(--nav-text);
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--nav-accent);
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          background-color: var(--nav-hover);
        }

        .nav-link:hover::before {
          width: 100%;
        }

        .nav-icon {
          font-size: 1.1rem;
        }

        .register-btn {
          background-color: var(--nav-accent);
          padding: 0.6rem 1.5rem;
        }

        .register-btn:hover {
          background-color: #d13354;
          transform: translateY(-2px);
        }

        .logout-btn {
          background: none;
          border: none;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .navbar-container {
            flex-direction: column;
            padding: 1rem;
          }

          .navbar-links {
            width: 100%;
            justify-content: space-between;
            margin-top: 1rem;
          }

          .nav-group {
            gap: 0.5rem;
          }

          .nav-link {
            padding: 0.5rem;
            font-size: 0.85rem;
          }

          .nav-icon {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .logo-text {
            display: none;
          }

          .nav-link span {
            display: none;
          }

          .nav-link {
            padding: 0.6rem;
            border-radius: 50%;
          }

          .register-btn span {
            display: inline;
          }

          .register-btn {
            border-radius: 30px;
            padding: 0.6rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;