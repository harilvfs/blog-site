import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBlogPosts } from '../utils/blogLoader';
import BlogCard from '../components/BlogCard';
import { fadeIn } from '../utils/animations';
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
  
  return (
    <div className="blog-list-page">
      <motion.section 
        className="blog-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <motion.h1 
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Articles & Thoughts
          </motion.h1>
          
          <motion.div 
            className={`search-container ${isSearchFocused ? 'focused' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
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
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
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
          </motion.div>
          
          {allTags.length > 0 && (
            <motion.div 
              className="tag-filters"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`tag-filter ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      <section className="blog-posts">
        <div className="container">
          <motion.div 
            className="posts-grid"
            variants={fadeIn}
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
                  tags={post.tags}
                />
              ))
            ) : (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="no-results-content">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  <h2>No posts found</h2>
                  <p>Try adjusting your search or filter criteria</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedTag(null);
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogListPage; 
