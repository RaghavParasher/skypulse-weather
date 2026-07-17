import axios from 'axios';

const GEOCODING_SEARCH_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const REVERSE_GEOCODE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

/**
 * Search cities by name with autocomplete (up to 10 results)
 */
export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];

  try {
    const response = await axios.get(GEOCODING_SEARCH_URL, {
      params: {
        name: query.trim(),
        count: 10,
        language: 'en',
        format: 'json'
      },
      timeout: 8000
    });

    return (response.data.results || []).map((item) => ({
      id: `${item.id || item.name}-${item.latitude}-${item.longitude}`,
      name: item.name,
      country: item.country || '',
      countryCode: item.country_code ? item.country_code.toLowerCase() : '',
      admin1: item.admin1 || '', // State / province
      latitude: item.latitude,
      longitude: item.longitude,
      timezone: item.timezone || 'auto'
    }));
  } catch (error) {
    console.error('Geocoding search failed:', error);
    return [];
  }
}

/**
 * Reverse geocode latitude and longitude to get city, state, country name
 */
export async function reverseGeocode(latitude, longitude) {
  try {
    const response = await axios.get(REVERSE_GEOCODE_URL, {
      params: {
        latitude,
        longitude,
        localityLanguage: 'en'
      },
      timeout: 8000
    });

    const data = response.data;
    const city = data.city || data.locality || data.principalSubdivision || 'Unknown Location';
    const state = data.principalSubdivision || '';
    const country = data.countryName || '';
    const countryCode = data.countryCode ? data.countryCode.toLowerCase() : '';

    return {
      id: `${city}-${latitude.toFixed(3)}-${longitude.toFixed(3)}`,
      name: city,
      country,
      countryCode,
      admin1: state !== city ? state : '',
      latitude,
      longitude,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto'
    };
  } catch (error) {
    console.warn('Reverse geocode failed, using coordinates fallback:', error);
    return {
      id: `coord-${latitude.toFixed(3)}-${longitude.toFixed(3)}`,
      name: `Lat ${latitude.toFixed(2)}°, Lon ${longitude.toFixed(2)}°`,
      country: 'GPS Coordinates',
      countryCode: '',
      admin1: '',
      latitude,
      longitude,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto'
    };
  }
}
