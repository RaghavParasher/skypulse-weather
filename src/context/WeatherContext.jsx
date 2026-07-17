import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getWeatherData, getAirQualityData, getWeatherMeta } from '../services/weatherApi';
import { useGeolocation } from '../hooks/useGeolocation';
import { useFavorites } from './FavoritesContext';

const WeatherContext = createContext();

export const ACTIVE_LOCATION_STORAGE_KEY = 'skypulse_active_location';

const defaultLocation = {
  id: 'Tokyo-35.689-139.692',
  name: 'Tokyo',
  country: 'Japan',
  admin1: 'Tokyo',
  latitude: 35.689,
  longitude: 139.692,
  timezone: 'Asia/Tokyo'
};

export const WeatherProvider = ({ children }) => {
  const { addRecentSearch } = useFavorites();
  const { requestGeolocation, loadingGeo, geoError } = useGeolocation();

  const [activeLocation, setActiveLocation] = useState(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_LOCATION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultLocation;
    } catch {
      return defaultLocation;
    }
  });

  // If no location was saved in localStorage originally, show initial selection prompt modal
  const [isInitialLocationSelect, setIsInitialLocationSelect] = useState(() => {
    try {
      return !localStorage.getItem(ACTIVE_LOCATION_STORAGE_KEY);
    } catch {
      return true;
    }
  });

  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [weatherState, setWeatherState] = useState('sunny'); // sunny | cloudy | rain | snow | storm | fog | night
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // null | 'NOT_FOUND' | 'NO_INTERNET' | 'API_ERROR' | 'PERMISSION_DENIED'
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchWeatherForLocation = useCallback(async (location, isSilent = false) => {
    if (!location || !location.latitude || !location.longitude) return;

    if (!isSilent) setLoading(true);
    setError(null);

    try {
      const [weather, aq] = await Promise.all([
        getWeatherData(location.latitude, location.longitude, location.timezone || 'auto'),
        getAirQualityData(location.latitude, location.longitude)
      ]);

      setWeatherData(weather);
      setAirQualityData(aq);
      setLastUpdated(new Date());

      // Determine dynamic background state
      const currentCode = weather.current?.weather_code ?? 0;
      const isDay = weather.current?.is_day ?? 1;
      const meta = getWeatherMeta(currentCode, isDay);
      setWeatherState(meta.bg);

      if (!isSilent) setLoading(false);
    } catch (err) {
      if (!isSilent) setLoading(false);
      const errMessage = err.message || 'API_ERROR';
      setError(errMessage);
      if (!isSilent && errMessage === 'NO_INTERNET') {
        toast.error('You are offline. Please check your internet connection.');
      } else if (!isSilent) {
        toast.error('Failed to fetch weather forecast. Please try again.');
      }
    }
  }, []);

  // Initial fetch and when location changes
  useEffect(() => {
    fetchWeatherForLocation(activeLocation);
  }, [activeLocation, fetchWeatherForLocation]);

  // Auto refresh every 10 minutes (600,000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchWeatherForLocation(activeLocation, true);
    }, 600000);

    return () => clearInterval(interval);
  }, [activeLocation, fetchWeatherForLocation]);

  const selectLocation = (location, skipRecent = false) => {
    if (!location) return;
    const locObj = {
      id: location.id || `${location.name}-${location.latitude}-${location.longitude}`,
      name: location.name,
      country: location.country || '',
      admin1: location.admin1 || '',
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone || 'auto'
    };

    setActiveLocation(locObj);
    setIsInitialLocationSelect(false);
    try {
      localStorage.setItem(ACTIVE_LOCATION_STORAGE_KEY, JSON.stringify(locObj));
    } catch (e) {
      console.error('Failed to save active location:', e);
    }

    if (!skipRecent) {
      addRecentSearch(locObj);
    }
  };

  const refreshWeather = async () => {
    const toastId = toast.loading('Refreshing weather...');
    await fetchWeatherForLocation(activeLocation, true);
    toast.success('Live forecast updated!', { id: toastId });
  };

  const triggerGeolocation = () => {
    const toastId = toast.loading('Detecting your GPS location...');
    requestGeolocation(
      (locData) => {
        toast.dismiss(toastId);
        selectLocation(locData);
        toast.success(`Location updated to ${locData.name}!`);
      },
      (errCode) => {
        toast.dismiss(toastId);
        if (errCode === 'PERMISSION_DENIED') {
          setError('PERMISSION_DENIED');
          toast.error('Location access denied. Please allow GPS or use search.');
        } else {
          toast.error('Failed to detect GPS location. Please search manually.');
        }
      }
    );
  };

  const dismissInitialModal = () => {
    setIsInitialLocationSelect(false);
    try {
      localStorage.setItem(ACTIVE_LOCATION_STORAGE_KEY, JSON.stringify(activeLocation));
    } catch {
      // ignore
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        activeLocation,
        selectLocation,
        weatherData,
        airQualityData,
        weatherState,
        loading,
        error,
        setError,
        lastUpdated,
        refreshWeather,
        triggerGeolocation,
        loadingGeo,
        geoError,
        isInitialLocationSelect,
        dismissInitialModal
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used within a WeatherProvider');
  return context;
};
