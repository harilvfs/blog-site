import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getBlogPosts } from '../utils/blogLoader';
import BlogCard from '../components/BlogCard';
import { slideUp, staggerContainer } from '../utils/animations';
import '../styles/blog.css';

const BlogListPage: React.FC = () => {
  const allPosts = getBlogPosts();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter posts based on search term
  const filteredPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.tags && post.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );
  
  return (
    <div className="blog-list-page">
      <motion.section 
        className="blog-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <motion.h1 
            className="blog-title"
            variants={slideUp}
            initial="hidden"
            animate="visible"
          >
            Blog
          </motion.h1>
          <motion.div 
            className="search-container"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="search-icon" 
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
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </motion.div>
        </div>
      </motion.section>

      <section className="blog-posts">
        <div className="container">
          <motion.div 
            className="posts-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  coverImage={post.coverImage}
                />
              ))
            ) : (
              <motion.div 
                className="no-results"
                variants={slideUp}
                initial="hidden"
                animate="visible"
              >
                <p>No posts found matching your search.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogListPage; 