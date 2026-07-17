import { useState, useCallback } from 'react';
import { reverseGeocode } from '../services/geocodingApi';

export function useGeolocation() {
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [geoError, setGeoError] = useState(null);

  const requestGeolocation = useCallback(async (onSuccess, onError) => {
    if (!navigator.geolocation) {
      const err = 'Location permission or GPS is not supported by your browser.';
      setGeoError(err);
      if (onError) onError(err);
      return;
    }

    setLoadingGeo(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const locationData = await reverseGeocode(latitude, longitude);
          setLoadingGeo(false);
          if (onSuccess) onSuccess(locationData);
        } catch (err) {
          setLoadingGeo(false);
          setGeoError('Failed to resolve city name from coordinates.');
          if (onError) onError('Failed to resolve city name from coordinates.');
        }
      },
      (error) => {
        setLoadingGeo(false);
        let message = 'Location access was denied or unavailable.';
        if (error.code === 1) {
          message = 'PERMISSION_DENIED';
        } else if (error.code === 2) {
          message = 'POSITION_UNAVAILABLE';
        } else if (error.code === 3) {
          message = 'TIMEOUT';
        }
        setGeoError(message);
        if (onError) onError(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      }
    );
  }, []);

  return { requestGeolocation, loadingGeo, geoError, setGeoError };
}
