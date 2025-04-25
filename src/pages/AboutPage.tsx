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
              This is a minimalist blog built with React, TypeScript, and Framer Motion.
              It features a clean design with subtle animations to enhance the user experience
              without being distracting.
            </p>
            
            <h2>Features</h2>
            <ul>
              <li>Responsive design that works on all devices</li>
              <li>Markdown support for easy content writing</li>
              <li>Minimal and beautiful animations</li>
              <li>TypeScript for type safety</li>
              <li>Clean, accessible UI</li>
            </ul>
            
            <h2>Technology Stack</h2>
            <ul>
              <li>React for the UI</li>
              <li>TypeScript for type safety</li>
              <li>React Router for navigation</li>
              <li>Framer Motion for animations</li>
              <li>React Markdown for rendering Markdown content</li>
            </ul>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage; 