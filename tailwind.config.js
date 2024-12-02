/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: {
          'bg-primary': '#0F1115',
          'bg-secondary': '#1A1D24',
          'bg-tertiary': '#242832',
          'accent-primary': {
            from: '#4F46E5',
            via: '#6366F1',
            to: '#818CF8'
          },
          'accent-secondary': {
            from: '#818CF8',
            to: '#A5B4FC'
          },
          'accent-hover': '#6366F1',
          'text-primary': '#F9FAFB',
          'text-secondary': '#D1D5DB',
          'text-tertiary': '#9CA3AF',
          'border-primary': '#2D3139',
          'border-secondary': '#374151',
          'glow': '0 0 20px rgba(99, 102, 241, 0.5)'
        },
        
        crimson: {
          'bg-primary': '#0F0A0A',
          'bg-secondary': '#1A1212',
          'bg-tertiary': '#241919',
          'accent-primary': {
            from: '#8B0000',
            via: '#B22222',
            to: '#DC143C'
          },
          'accent-secondary': {
            from: '#B22222',
            to: '#DC143C'
          },
          'accent-hover': '#DC143C',
          'text-primary': '#F9FAFB',
          'text-secondary': '#D1D5DB',
          'text-tertiary': '#9CA3AF',
          'border-primary': '#2D2424',
          'border-secondary': '#372828',
          'glow': '0 0 20px rgba(220, 20, 60, 0.5)'
        },

        mono: {
          'bg-primary': '#000000',
          'bg-secondary': '#121212',
          'bg-tertiary': '#1E1E1E',
          'accent-primary': {
            from: '#FFFFFF',
            via: '#E5E5E5',
            to: '#CCCCCC'
          },
          'accent-secondary': {
            from: '#E5E5E5',
            to: '#CCCCCC'
          },
          'accent-hover': '#F5F5F5',
          'text-primary': '#FFFFFF',
          'text-secondary': '#CCCCCC',
          'text-tertiary': '#999999',
          'border-primary': '#333333',
          'border-secondary': '#444444',
          'glow': '0 0 20px rgba(255, 255, 255, 0.5)'
        },

        neon: {
          'bg-primary': '#0A0A0F',
          'bg-secondary': '#12121A',
          'bg-tertiary': '#1A1A24',
          'accent-primary': {
            from: '#FF1493',
            via: '#00CED1',
            to: '#FF1493'
          },
          'accent-secondary': {
            from: '#FF4500',
            to: '#8B0000'
          },
          'accent-hover': '#FF69B4',
          'text-primary': '#FFFFFF',
          'text-secondary': '#E5E5E5',
          'text-tertiary': '#CCCCCC',
          'border-primary': '#2D2D39',
          'border-secondary': '#373751',
          'glow': {
            pink: '0 0 20px rgba(255, 20, 147, 0.5)',
            blue: '0 0 20px rgba(0, 206, 209, 0.5)',
            red: '0 0 20px rgba(255, 69, 0, 0.5)'
          }
        },

        ocean: {
          'bg-primary': '#0A0F1F',
          'bg-secondary': '#121A2D',
          'bg-tertiary': '#1A243D',
          'accent-primary': {
            from: '#4A00E0',
            via: '#5A67D8',
            to: '#0066FF'
          },
          'accent-secondary': {
            from: '#6B46C1',
            to: '#3B82F6'
          },
          'accent-hover': '#5A67D8',
          'text-primary': '#F9FAFB',
          'text-secondary': '#D1D5DB',
          'text-tertiary': '#9CA3AF',
          'border-primary': '#2D3548',
          'border-secondary': '#374761',
          'glow': '0 0 20px rgba(90, 103, 216, 0.5)'
        }
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'var(--accent-gradient)',
        'gradient-secondary': 'var(--accent-secondary-gradient)'
      },

      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-neon': 'glow-neon 8s linear infinite',
        'float': 'float 6s ease-in-out infinite'
      },

      keyframes: {
        glow: {
          '0%': {
            'box-shadow': '0 0 5px var(--accent-primary), 0 0 10px var(--accent-primary)'
          },
          '100%': {
            'box-shadow': '0 0 10px var(--accent-primary), 0 0 20px var(--accent-primary), 0 0 30px var(--accent-primary)'
          }
        },
        'glow-neon': {
          '0%, 100%': {
            'filter': 'hue-rotate(0deg) brightness(1)'
          },
          '50%': {
            'filter': 'hue-rotate(360deg) brightness(1.2)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        }
      },

      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Clash Display', 'sans-serif'],
        'cyber': ['Cyberpunk', 'sans-serif']
      }
    }
  },
  plugins: [
    forms,
    typography
  ]
};
