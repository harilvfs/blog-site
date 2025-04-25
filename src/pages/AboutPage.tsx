import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '../utils/animations';
import '../styles/about.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="container">
        <motion.section 
          className="about-section"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="about-title"
            variants={slideUp}
            initial="hidden"
            animate="visible"
          >
            About This Blog
          </motion.h1>
          
          <motion.div 
            className="about-content"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <p>
              I am Aayush Chalise, a Linux enthusiast who loves working with Arch Linux and creating bash scripts.
              I'm passionate about open source software and enjoy sharing my knowledge through this blog.
            </p>
            
            <h2>Interests</h2>
            <ul>
              <li>Arch Linux customization and maintenance</li>
              <li>Bash scripting and automation</li>
              <li>Open source contributions</li>
              <li>Linux system administration</li>
              <li>Terminal-based applications</li>
            </ul>
            
            <h2>Technology Stack</h2>
            <ul>
              <li>Arch Linux</li>
              <li>Bash scripts</li>
              <li>Various open source tools</li>
              <li>React for this blog</li>
              <li>Git for version control</li>
            </ul>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage; 