import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPostById } from '../utils/blogLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { fadeIn } from '../utils/animations';
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
            className="post-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="post-cover-container">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="post-cover-image" 
              />
              <div className="post-cover-overlay"></div>
            </div>
            
            <div className="post-hero-content container">
              <motion.h1 
                className="post-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {post.title}
              </motion.h1>
              
              <motion.div 
                className="post-meta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <MarkdownRenderer content={post.content} />
          </motion.div>
          
          <motion.div 
            className="post-navigation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
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
