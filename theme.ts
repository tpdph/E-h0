import { createTheme, ThemeOptions } from '@mui/material/styles';
import { useTheme } from './contexts/ThemeContext';
import React from 'react';

const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#3B82F6' : '#2563EB',
      light: mode === 'dark' ? '#60A5FA' : '#3B82F6',
      dark: mode === 'dark' ? '#1D4ED8' : '#1E40AF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: mode === 'dark' ? '#60A5FA' : '#3B82F6',
      light: mode === 'dark' ? '#93C5FD' : '#60A5FA',
      dark: mode === 'dark' ? '#2563EB' : '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    background: {
      default: mode === 'dark' ? '#111827' : '#F3F4F6',
      paper: mode === 'dark' ? '#1F2937' : '#FFFFFF',
    },
    text: {
      primary: mode === 'dark' ? '#F9FAFB' : '#111827',
      secondary: mode === 'dark' ? '#D1D5DB' : '#4B5563',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? '#1F2937' : '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #D1D5DB',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? '#1F2937' : '#FFFFFF',
          borderRadius: 12,
          border: '1px solid #D1D5DB',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: mode === 'dark' ? '#6B7280' : '#D1D5DB',
        },
      },
    },
  },
});

export function useAppTheme() {
  const { mode } = useTheme();
  return React.useMemo(() => createTheme(getThemeOptions(mode)), [mode]);
}
