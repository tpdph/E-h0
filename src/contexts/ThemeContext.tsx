import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'purple' | 'crimson' | 'mono' | 'neon' | 'ocean';
export type ThemeModeType = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeType;
  mode: ThemeModeType;
  setTheme: (theme: ThemeType) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('purple');
  const [mode, setMode] = useState<ThemeModeType>('dark');

  useEffect(() => {
    // Load stored preferences first
    const storedTheme = localStorage.getItem('theme-preference') as ThemeType | null;
    const storedMode = localStorage.getItem('theme-mode') as ThemeModeType | null;
    
    if (storedTheme && ['purple', 'crimson', 'mono', 'neon', 'ocean'].includes(storedTheme)) {
      setTheme(storedTheme);
    }
    if (storedMode && ['dark', 'light'].includes(storedMode)) {
      setMode(storedMode);
    }
  }, []);

  useEffect(() => {
    // Apply theme classes to body with transition
    document.body.style.transition = 'background-color 0.3s ease-in-out, color 0.3s ease-in-out';
    document.body.className = `theme-${theme} ${mode} theme-transition`;
    
    // Store theme preference
    localStorage.setItem('theme-preference', theme);
    localStorage.setItem('theme-mode', mode);
  }, [theme, mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
