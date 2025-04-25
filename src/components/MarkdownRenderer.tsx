import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { slideUp } from '../utils/animations';
import '../styles/MarkdownRenderer.css';

interface MarkdownRendererProps {
  content: string;
  showReadingTime?: boolean;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  showReadingTime = true 
}) => {
  const readingTime = useMemo(() => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  }, [content]);

  return (
    <motion.div 
      className="markdown-content"
      variants={slideUp}
      initial="hidden"
      animate="visible"
    >
      {showReadingTime && (
        <div className="reading-time">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {readingTime} min read
        </div>
      )}
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </motion.div>
  );
};

export default MarkdownRenderer; 