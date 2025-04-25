import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { slideUp } from '../utils/animations';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <motion.div 
      className="markdown-content"
      variants={slideUp}
      initial="hidden"
      animate="visible"
    >
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </motion.div>
  );
};

export default MarkdownRenderer; 