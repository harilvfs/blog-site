import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../utils/ThemeContext';
import ThemeToggle from './ThemeToggle';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <header 
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark' : 'light'}`}
    >
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <svg 
            className="navbar-logo-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
          </svg>
          <motion.span 
            className="logo-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Minimal<span className="logo-accent">Blog</span>
          </motion.span>
        </Link>

        {/* Mobile Menu Backdrop */}
        {isMenuOpen && (
          <motion.div 
            className="navbar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <motion.div 
          className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}
          variants={{
            closed: { x: '100%' },
            open: { x: 0 }
          }}
          initial="closed"
          animate={isMenuOpen ? 'open' : 'closed'}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        >
          <nav className="navbar-nav">
            <NavLink to="/" isActive={location.pathname === '/'}>Home</NavLink>
            <NavLink to="/blog" isActive={location.pathname === '/blog' || location.pathname.startsWith('/blog/')}>Blog</NavLink>
            <NavLink to="/about" isActive={location.pathname === '/about'}>About</NavLink>
            <div className="nav-theme-toggle">
              <ThemeToggle />
            </div>
          </nav>
        </motion.div>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          <ThemeToggle />
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
          >
            <span className="menu-icon"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, children }) => {
  return (
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
      {children}
      {isActive && (
        <div className="nav-link-indicator" />
      )}
    </Link>
  );
};

export default Navbar; 