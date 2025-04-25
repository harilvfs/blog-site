import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPostById } from '../utils/blogLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { fadeIn, slideUp } from '../utils/animations';
import '../styles/blogpost.css';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = getBlogPostById(id || '');
  
  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [post, navigate]);
  
  if (!post) {
    return null;
  }
  
  return (
    <div className="blog-post-page">
      <motion.article 
        className="blog-post"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        {post.coverImage && (
          <motion.div 
            className="post-cover-container"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="post-cover-image" 
            />
          </motion.div>
        )}
        
        <div className="container">
          <motion.header 
            className="post-header"
            variants={slideUp}
            initial="hidden"
            animate="visible"
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
          
          <div className="post-content">
            <MarkdownRenderer content={post.content} />
          </div>
          
          <motion.div 
            className="post-navigation"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <button 
              onClick={() => navigate('/blog')}
              className="back-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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