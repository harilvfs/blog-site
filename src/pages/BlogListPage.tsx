import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBlogPosts } from '../utils/blogLoader';
import BlogCard from '../components/BlogCard';
import '../styles/blog.css';

const BlogListPage: React.FC = () => {
  const allPosts = getBlogPosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const allTags = Array.from(
    new Set(
      allPosts
        .flatMap(post => post.tags || [])
        .filter(tag => tag)
    )
  );
  
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = searchTerm.trim() === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.tags && post.tags.some(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    
    const matchesTag = !selectedTag || 
      (post.tags && post.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleTagClick = (tag: string) => {
    setSelectedTag(prev => prev === tag ? null : tag);
  };
  
  const springTransition = {
    type: "spring",
    damping: 15,
    stiffness: 80,
    mass: 0.8
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.06,
        duration: 0.4
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: springTransition
    }
  };

  const tagVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      y: -3,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };
  
  return (
    <div className="blog-list-page">
      <div className="container">
        <motion.header 
          className="page-header"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="header-decoration">
            <motion.div 
              className="decoration-orb"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.7, 0.5],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror"
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            />
          </div>
          
          <motion.h1 
            className="page-title"
            variants={itemVariants}
          >
            Blog
          </motion.h1>
          <motion.p 
            className="page-description"
            variants={itemVariants}
          >
            Explore our latest articles and insights
          </motion.p>
          
          <motion.div 
            className="blog-filters"
            variants={itemVariants}
          >
            <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
              <svg 
                className="search-icon" 
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
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  className="search-clear" 
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            
            {allTags.length > 0 && (
              <motion.div 
                className="tags-filter"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {allTags.map(tag => (
                  <motion.button
                    key={tag}
                    className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
                    onClick={() => handleTagClick(tag)}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    variants={tagVariants}
                    layout
                  >
                    {selectedTag === tag ? (
                      <motion.span className="tag-content">
                        <svg 
                          className="tag-icon" 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="14" 
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {tag}
                      </motion.span>
                    ) : (
                      tag
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.header>
        
        <motion.div 
          className="blog-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <BlogCard 
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                coverImage={post.coverImage}
                tags={post.tags}
              />
            ))
          ) : (
            <motion.div 
              className="no-results"
              variants={itemVariants}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h2>No posts found</h2>
              <p>Try adjusting your search or filter criteria</p>
              <button 
                className="btn btn-outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag(null);
                }}
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogListPage; 
