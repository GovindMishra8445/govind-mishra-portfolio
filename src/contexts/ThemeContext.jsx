// contexts/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the theme
const ThemeContext = createContext();

// ThemeProvider component to wrap your app
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Load the saved theme from localStorage or default to 'light'
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  // Provide the theme and toggleTheme function to child components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export ThemeContext for direct use (if needed)
export { ThemeContext };

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);