import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { slideUp } from '../utils/animations';
import '../styles/MarkdownRenderer.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
  showReadingTime?: boolean;
}

function parseContent(content: string): { type: 'callout' | 'markdown', content: string, calloutType?: string }[] {
  const result: { type: 'callout' | 'markdown', content: string, calloutType?: string }[] = [];
  
  const lines = content.split('\n');
  let currentBlock: { type: 'callout' | 'markdown', content: string[], calloutType?: string } | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const calloutMatch = line.match(/^>\s*\[!(NOTE|WARNING|CAUTION|TIP|IMPORTANT)\]/);
    
    if (calloutMatch) {
      if (currentBlock) {
        result.push({
          type: currentBlock.type,
          content: currentBlock.content.join('\n'),
          calloutType: currentBlock.calloutType
        });
      }
      
      currentBlock = {
        type: 'callout',
        content: [line.replace(/^>\s*\[!(NOTE|WARNING|CAUTION|TIP|IMPORTANT)\]\s*/, '')],
        calloutType: calloutMatch[1]
      };
    } else if (line.startsWith('>') && currentBlock && currentBlock.type === 'callout') {
      currentBlock.content.push(line.replace(/^>\s?/, ''));
    } else {
      if (currentBlock && currentBlock.type === 'callout') {
        result.push({
          type: currentBlock.type,
          content: currentBlock.content.join('\n'),
          calloutType: currentBlock.calloutType
        });
        currentBlock = null;
      }
      
      if (!currentBlock) {
        currentBlock = {
          type: 'markdown',
          content: [line]
        };
      } else {
        currentBlock.content.push(line);
      }
    }
  }
  
  if (currentBlock) {
    result.push({
      type: currentBlock.type,
      content: currentBlock.content.join('\n'),
      calloutType: currentBlock.calloutType
    });
  }
  
  return result;
}

const YouTubeEmbed: React.FC<{ url: string }> = ({ url }) => {
  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(url);
  if (!videoId) return <p>Invalid YouTube URL</p>;

  return (
    <div className="youtube-embed">
      <iframe 
        width="100%" 
        height="315" 
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      ></iframe>
    </div>
  );
};

const components = {
  img: ({ node, ...props }: any) => (
    <div className="markdown-image-wrapper">
      <img {...props} className="markdown-image" alt={props.alt || 'Blog image'} />
      {props.alt && <span className="markdown-image-caption">{props.alt}</span>}
    </div>
  ),
  p: ({ node, children }: any) => {
    if (node.children[0]?.tagName === 'a') {
      const link = node.children[0];
      const text = link.children[0]?.value;
      const href = link.properties?.href;
      
      if (typeof href === 'string' && 
          (href.includes('youtube.com') || href.includes('youtu.be')) && 
          text && text.includes(href)) {
        return <YouTubeEmbed url={href} />;
      }
    }
    return <p>{children}</p>;
  }
};

function processMarkdown(content: string): string {
  const youtubeRegex = /!youtube\[(https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s\]]+)\]/g;
  const processedContent = content.replace(youtubeRegex, (match, url) => {
    return `[${url}](${url})`;
  });
  
  return processedContent;
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

  const processedContent = useMemo(() => processMarkdown(content), [content]);

  const parsedContent = useMemo(() => parseContent(processedContent), [processedContent]);

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
      
      {parsedContent.map((block, index) => {
        if (block.type === 'markdown') {
          return (
            <ReactMarkdown 
              key={index} 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeRaw]}
              components={components}
            >
              {block.content}
            </ReactMarkdown>
          );
        } else if (block.type === 'callout' && block.calloutType) {
          return (
            <div 
              key={index} 
              className={`callout callout-${block.calloutType.toLowerCase()}`}
            >
              <div className="callout-title">
                <span 
                  className="callout-icon" 
                  dangerouslySetInnerHTML={{ 
                    __html: getCalloutIcon(block.calloutType) 
                  }} 
                />
                <span>{block.calloutType}</span>
              </div>
              <div className="callout-content">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  rehypePlugins={[rehypeRaw]}
                  components={components}
                >
                  {block.content}
                </ReactMarkdown>
              </div>
            </div>
          );
        }
        return null;
      })}
    </motion.div>
  );
};

function getCalloutIcon(type: string): string {
  switch (type.toLowerCase()) {
    case 'note':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    case 'warning':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    case 'caution':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    case 'tip':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>`;
    case 'important':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M12 6v2"></path><path d="M12 10v4"></path></svg>`;
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }
}

export default MarkdownRenderer; 
