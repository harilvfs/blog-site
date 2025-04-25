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
  // Initialize state with null to prevent flash of wrong theme
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Apply theme synchronously to prevent flashing
    const applyTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Determine the theme
      const initialTheme = savedTheme 
        ? savedTheme === 'dark'
        : prefersDark;
      
      // Apply it to state  
      setIsDarkMode(initialTheme);
      
      // Apply it directly to the DOM to prevent flash
      if (initialTheme) {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }

      // Use requestAnimationFrame to ensure all DOM operations are batched
      document.documentElement.classList.add('theme-initialized');
      
      // Immediately set initializing to false to speed up rendering
      setIsInitializing(false);
    };

    // Apply theme immediately
    applyTheme();
    
    return () => {
      document.documentElement.classList.remove('theme-initialized');
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      
      // Apply theme change to localStorage
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      
      // Apply theme change to DOM
      if (newTheme) {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
      
      return newTheme;
    });
  };

  // Show loading screen while initializing
  if (isInitializing || isDarkMode === null) {
    return <LoadingScreen />;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode: isDarkMode ?? false, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 