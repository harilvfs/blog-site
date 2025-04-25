import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPosts } from '../utils/blogLoader';
import BlogCard from '../components/BlogCard';
import { fadeIn } from '../utils/animations';
import '../styles/home.css';

const HomePage: React.FC = () => {
  const recentPosts = getBlogPosts().slice(0, 3);
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="home-page">
      <motion.section 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container hero-container">
          <div className="hero-content">
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Beautiful Minimalist <span className="accent">Blog</span>
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              A modern, cleanly designed blog built with React, TypeScript, and Framer Motion
            </motion.p>
            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Link to="/blog" className="btn btn-primary">
                Explore Articles
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </motion.div>
          </div>
          <div className="hero-decoration">
            <div className="hero-blob"></div>
            <div className="hero-circle"></div>
          </div>
        </div>
      </motion.section>

      <section className="recent-posts">
        <div className="container">
          <header className="section-header">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Latest Articles
            </motion.h2>
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              Check out my most recent writings and insights
            </motion.p>
          </header>
          
          <motion.div 
            className="posts-grid"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {recentPosts.map(post => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                coverImage={post.coverImage}
                tags={post.tags}
              />
            ))}
          </motion.div>
          
          <motion.div 
            className="view-all-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link to="/blog" className="btn btn-outline">
              View All Articles
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <motion.div 
            className="features-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="feature-card">
              <div className="feature-icon">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  <path d="M12 8v4l3 3"></path>
                </svg>
              </div>
              <h3 className="feature-title">Quick Loading</h3>
              <p className="feature-description">Optimized performance for a fast and smooth browsing experience across all devices.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Secure Content</h3>
              <p className="feature-description">All content is securely delivered and protected for your peace of mind.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 3v10"></path>
                  <path d="M18 7l-6-4-6 4v10a2 2 0 002 2h8a2 2 0 002-2V7z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Bookmark & Save</h3>
              <p className="feature-description">Easily bookmark and save your favorite articles for later reading.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 