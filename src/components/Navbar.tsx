import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../utils/ThemeContext';
import ThemeToggle from './ThemeToggle';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Create a throttled scroll handler for better performance
  const throttle = <T extends (...args: any[]) => any>(
    callback: T,
    delay: number
  ) => {
    let lastCall = 0;
    return (...args: Parameters<T>) => {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback(...args);
    };
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Show navbar when at the top, hide when scrolled down
    if (currentScrollY < 30) {
      setHideNavbar(false);
    } else {
      setHideNavbar(true);
    }
    
    // Update the scroll state for shadow effect
    setIsScrolled(currentScrollY > 20);
    
    // Update the last scroll position
    setLastScrollY(currentScrollY);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);

    const throttledHandleScroll = throttle(handleScroll, 50);
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Initial call to set correct state
    handleScroll();
    
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  // Don't hide navbar when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      setHideNavbar(false);
    }
  }, [isMenuOpen]);

  return (
    <header 
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${hideNavbar ? 'hidden' : ''} ${isDarkMode ? 'dark' : 'light'}`}
      aria-hidden={hideNavbar}
    >
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
            src="/blog-site/images/aayush.png" 
            alt="Aayush" 
            className="navbar-logo-icon" 
          />
          <motion.span 
            className="logo-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Aayush<span className="logo-accent">Blogs</span>
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
