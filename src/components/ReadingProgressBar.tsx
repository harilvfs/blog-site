import React, { useEffect, useState } from 'react';
import '../styles/ReadingProgressBar.css';

interface ReadingProgressBarProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  color = 'var(--primary-color)',
  height = 4,
  position = 'top'
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateProgressBar = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100);
      setWidth(scrollPercentRounded);
    };

    window.addEventListener('scroll', updateProgressBar);
    
    updateProgressBar();

    return () => window.removeEventListener('scroll', updateProgressBar);
  }, []);

  return (
    <div 
      className={`reading-progress-container ${position}`}
      style={{
        position: 'fixed',
        top: position === 'top' ? 0 : 'auto',
        bottom: position === 'bottom' ? 0 : 'auto',
        left: 0,
        width: '100%',
        height: `${height}px`,
        backgroundColor: 'rgba(0,0,0,0.1)',
        zIndex: 100
      }}
    >
      <div
        className="reading-progress-bar"
        style={{
          height: '100%',
          width: `${width}%`,
          backgroundColor: color,
          transition: 'width 0.1s ease'
        }}
      />
    </div>
  );
};

export default ReadingProgressBar; 
