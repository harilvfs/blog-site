import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/blogcard.css';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, excerpt, date, coverImage }) => {
  return (
    <motion.article 
      className="blog-card"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/blog/${id}`} className="blog-card-link">
        {coverImage && (
          <div className="blog-card-image-container">
            <img src={coverImage} alt={title} className="blog-card-image" />
          </div>
        )}
        <div className="blog-card-content">
          <h2 className="blog-card-title">{title}</h2>
          <time className="blog-card-date">{date}</time>
          <p className="blog-card-excerpt">{excerpt}</p>
          <span className="blog-card-read-more">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard; 