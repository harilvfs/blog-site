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

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      damping: 12, 
      stiffness: 100,
      mass: 0.9
    }
  }
};

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
      variants={cardVariants}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 15 
        } 
      }}
    >
      <Link to={`/blog/${id}`} className="blog-card-link">
        {coverImage && (
          <motion.div 
            className="blog-card-image-container"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
            }}
          >
            <motion.img 
              src={coverImage} 
              alt={title} 
              className="blog-card-image" 
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 }
              }}
            />
            <div className="blog-card-overlay"></div>
          </motion.div>
        )}
        <div className="blog-card-content">
          <div className="blog-card-meta">
            <time className="blog-card-date">{date}</time>
            {tags && tags.length > 0 && (
              <div className="blog-card-tags">
                {tags.slice(0, 2).map(tag => (
                  <motion.span 
                    key={tag} 
                    className="blog-card-tag"
                    whileHover={{ 
                      y: -2, 
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
                {tags.length > 2 && <span className="blog-card-tag-more">+{tags.length - 2}</span>}
              </div>
            )}
          </div>
          <motion.h2 
            className="blog-card-title"
            whileHover={{ 
              x: 4, 
              color: "var(--primary-color)",
              transition: { duration: 0.2 }
            }}
          >
            {title}
          </motion.h2>
          <p className="blog-card-excerpt">{excerpt}</p>
          <motion.div 
            className="blog-card-read-more"
            whileHover={{ 
              x: 8,
              transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 10 
              }
            }}
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