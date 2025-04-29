import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../utils/ThemeContext';
import ThemeToggle from './ThemeToggle';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasStartedScrolling, setHasStartedScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const isBlogPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      
      if (scrollY > 50) {
        setHasStartedScrolling(true);
      } else if (scrollY === 0) {
        setHasStartedScrolling(false);
      }
      
      if (isBlogPost) {
        if (scrollTimeoutRef.current) {
          cancelAnimationFrame(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = requestAnimationFrame(() => {
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          setScrollProgress(Math.min(100, Math.max(0, scrolled))); // Clamp between 0-100
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
    };
  }, [isBlogPost]);

  useEffect(() => {
    setIsMenuOpen(false);
    setHasStartedScrolling(false);
    setScrollProgress(0);
  }, [location]);

  return (
    <header 
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark' : 'light'}`}
    >
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
            src="images/aayush.png" 
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

        {/* mobile menu backdrop */}
        {isMenuOpen && (
          <motion.div 
            className="navbar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* mobile menu */}
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

        {/* desktop actions */}
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

      {/* reading progress bar for blog posts */}
      {isBlogPost && hasStartedScrolling && (
        <div className="navbar-progress-container">
          <div 
            className="navbar-progress-bar" 
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      )}
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
