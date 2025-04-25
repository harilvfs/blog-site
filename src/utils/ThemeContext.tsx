import React, { createContext, useState, useEffect, useContext } from 'react';
import LoadingScreen from '../components/LoadingScreen';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const applyTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const initialTheme = savedTheme 
        ? savedTheme === 'dark'
        : prefersDark;
      
      setIsDarkMode(initialTheme);
      
      if (initialTheme) {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }

      document.documentElement.classList.add('theme-initialized');
      
      setIsInitializing(false);
    };

    applyTheme();
    
    return () => {
      document.documentElement.classList.remove('theme-initialized');
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      
      if (newTheme) {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
      
      return newTheme;
    });
  };

  if (isInitializing || isDarkMode === null) {
    return <LoadingScreen />;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode: isDarkMode ?? false, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 
