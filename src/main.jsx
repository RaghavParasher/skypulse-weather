import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { WeatherProvider } from './context/WeatherContext';
import App from './App.jsx';
import './index.css';

// Register PWA service worker if supported
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <SettingsProvider>
        <FavoritesProvider>
          <WeatherProvider>
            <App />
          </WeatherProvider>
        </FavoritesProvider>
      </SettingsProvider>
    </HashRouter>
  </StrictMode>
);
