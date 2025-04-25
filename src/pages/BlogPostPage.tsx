import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPostById } from '../utils/blogLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import '../styles/blogpost.css';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = getBlogPostById(id || '');
  
  useEffect(() => {
    if (!post) {
      navigate('/blog');
      return;
    }
    window.scrollTo(0, 0);
  }, [post, navigate]);
  
  if (!post) {
    return null;
  }
  
  // Define animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };
  
  const elementVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 15, 
        stiffness: 100 
      }
    }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] 
      }
    }
  };
  
  return (
    <div className="blog-post-page">
      <ScrollToTopButton />
      <motion.article 
        className="blog-post"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {post.coverImage && (
          <motion.div 
            className="post-hero"
            variants={elementVariants}
          >
            <motion.div 
              className="post-cover-container"
              variants={imageVariants}
            >
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="post-cover-image" 
              />
              <div className="post-cover-overlay"></div>
            </motion.div>
            
            <div className="post-hero-content container">
              <motion.h1 
                className="post-title"
                variants={elementVariants}
              >
                {post.title}
              </motion.h1>
              
              <motion.div 
                className="post-meta"
                variants={elementVariants}
              >
                <time className="post-date">{post.date}</time>
                {post.tags && post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="post-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {!post.coverImage && (
          <div className="container">
            <motion.header 
              className="post-header no-cover"
              variants={elementVariants}
            >
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                <time className="post-date">{post.date}</time>
                {post.tags && post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="post-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.header>
          </div>
        )}
        
        <div className="container">
          <motion.div 
            className="post-content"
            variants={elementVariants}
          >
            <MarkdownRenderer content={post.content} />
          </motion.div>
          
          <motion.div 
            className="post-navigation"
            variants={elementVariants}
          >
            <button 
              onClick={() => navigate('/blog')}
              className="btn btn-outline"
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
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
              Back to all posts
            </button>
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
};

export default BlogPostPage; 
