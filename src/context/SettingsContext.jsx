import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const SettingsContext = createContext();

export const SETTINGS_STORAGE_KEY = 'skypulse_settings';

const defaultSettings = {
  tempUnit: 'celsius', // 'celsius' | 'fahrenheit'
  windUnit: 'kmh',     // 'kmh' | 'mph'
  theme: 'dark',       // 'dark' | 'light' | 'system'
  timeFormat: '12h',   // '12h' | '24h'
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (targetTheme) => {
      if (targetTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
    };

    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches ? 'dark' : 'light');

      const handler = (e) => applyTheme(e.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      applyTheme(settings.theme);
    }
  }, [settings.theme]);

  // Save settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const clearAllStorage = () => {
    if (window.confirm('Are you sure you want to clear all local storage? This will reset your preferences, favorites, and recent searches.')) {
      localStorage.clear();
      toast.success('All local storage cleared! Reloading app...');
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        updateSetting,
        clearAllStorage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};
