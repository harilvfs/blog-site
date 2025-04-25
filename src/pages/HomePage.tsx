import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPosts } from '../utils/blogLoader';
import BlogCard from '../components/BlogCard';
import { fadeIn, staggerContainer, slideUp } from '../utils/animations';
import '../styles/home.css';

const HomePage: React.FC = () => {
  const recentPosts = getBlogPosts().slice(0, 3);
  
  return (
    <div className="home-page">
      <motion.section 
        className="hero"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="container hero-container">
          <motion.h1 
            className="hero-title"
            variants={slideUp}
            initial="hidden"
            animate="visible"
          >
            Minimal and Beautiful <span className="accent">Markdown Blog</span>
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            A simple blog built with React, TypeScript, and Framer Motion
          </motion.p>
          <motion.div 
            className="hero-cta"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Link to="/blog" className="button button-primary">
              Read Blog
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <section className="recent-posts">
        <div className="container">
          <motion.h2 
            className="section-title"
            variants={slideUp}
            initial="hidden"
            animate="visible"
          >
            Recent Posts
          </motion.h2>
          <motion.div 
            className="posts-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {recentPosts.map(post => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                coverImage={post.coverImage}
              />
            ))}
          </motion.div>
          <motion.div 
            className="view-all-container"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Link to="/blog" className="view-all-link">
              View All Posts
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 