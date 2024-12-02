import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeModeType, ThemeType } from '../types';

interface ThemeContextType {
  theme: ThemeType;
  mode: ThemeModeType;
  setTheme: (theme: ThemeType) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const stored = localStorage.getItem('theme-preference') as ThemeType;
    return (stored && ['purple', 'crimson', 'mono', 'neon', 'ocean'].includes(stored))
      ? stored
      : 'purple';
  });

  const [mode, setMode] = useState<ThemeModeType>(() => {
    const stored = localStorage.getItem('theme-mode') as ThemeModeType;
    return (stored && ['dark', 'light'].includes(stored)) ? stored : 'dark';
  });

  useEffect(() => {
    document.body.className = `theme-${theme} ${mode} theme-transition`;
    localStorage.setItem('theme-preference', theme);
    localStorage.setItem('theme-mode', mode);
  }, [theme, mode]);

  const toggleMode = () => setMode(prev => prev === 'dark' ? 'light' : 'dark');

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
