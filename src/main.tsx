import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CircularProgress } from '@mui/material';

// Initialize i18n before rendering
import './i18n';

// Wait for i18n initialization before rendering
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Suspense fallback={<CircularProgress />}>
        <App />
      </Suspense>
    </React.StrictMode>
  );
});
