import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header 
      className="navbar"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <motion.span 
            className="logo-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Markdown Blog
          </motion.span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <nav className="navbar-nav">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
          </nav>
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`menu-icon ${isMenuOpen ? 'active' : ''}`}></span>
        </button>
      </div>
    </motion.header>
  );
};

export default Navbar; 