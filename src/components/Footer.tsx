import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/" className="footer-logo">
            <motion.img 
              src="/blog-site/images/aayush.png" 
              alt="Aayush Blogs"
              width="40"
              height="40"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            />
          </Link>
          <motion.p 
            className="copyright"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            &copy; {currentYear} Aayush Chalise. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 