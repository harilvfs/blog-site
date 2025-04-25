import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../utils/ThemeContext';
import '../styles/theme-toggle.css';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialRender(false);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.button 
      className="theme-toggle"
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: isInitialRender ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div 
        className="theme-toggle-track"
        animate={{ 
          backgroundColor: isDarkMode ? "#374151" : "#e5e7eb" 
        }}
        initial={false}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="theme-toggle-thumb"
          animate={{ 
            backgroundColor: isDarkMode ? "#818cf8" : "#6366f1" 
          }}
          initial={false}
          transition={{ 
            duration: 0.2
          }}
        />
        
        <div className="theme-toggle-icons">
          <motion.div 
            className="theme-toggle-icon sun"
            animate={{ opacity: isDarkMode ? 0.3 : 1 }}
            initial={false}
            transition={{ duration: 0.2 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </motion.div>
          <motion.div 
            className="theme-toggle-icon moon"
            animate={{ opacity: isDarkMode ? 1 : 0.3 }}
            initial={false}
            transition={{ duration: 0.2 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 
