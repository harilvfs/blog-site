import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GitHubIcon, TelegramIcon, DiscordIcon } from './Icons';
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
              src="/images/aayush.png" 
              alt="Aayush Blogs"
              width="40"
              height="40"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            />
          </Link>
          
          <motion.div className="social-links">
            <motion.a 
              href="https://github.com/harilvfs" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              <GitHubIcon width={24} height={24} />
            </motion.a>
            
            <motion.a 
              href="https://t.me/harilvfs" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              <TelegramIcon width={24} height={24} />
            </motion.a>
            
            <motion.a 
              href="https://discord.com/invite/8NJWstnUHd" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              <DiscordIcon width={24} height={24} />
            </motion.a>
          </motion.div>
          
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
