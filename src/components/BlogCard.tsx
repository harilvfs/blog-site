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
  tags?: string[];
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  id, 
  title, 
  excerpt, 
  date, 
  coverImage,
  tags 
}) => {
  return (
    <motion.article 
      className="blog-card"
      whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/blog/${id}`} className="blog-card-link">
        {coverImage && (
          <div className="blog-card-image-container">
            <img src={coverImage} alt={title} className="blog-card-image" />
            <div className="blog-card-overlay"></div>
          </div>
        )}
        <div className="blog-card-content">
          <div className="blog-card-meta">
            <time className="blog-card-date">{date}</time>
            {tags && tags.length > 0 && (
              <div className="blog-card-tags">
                {tags.slice(0, 2).map(tag => (
                  <span key={tag} className="blog-card-tag">{tag}</span>
                ))}
                {tags.length > 2 && <span className="blog-card-tag-more">+{tags.length - 2}</span>}
              </div>
            )}
          </div>
          <h2 className="blog-card-title">{title}</h2>
          <p className="blog-card-excerpt">{excerpt}</p>
          <motion.div 
            className="blog-card-read-more"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            Read More
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
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard; 