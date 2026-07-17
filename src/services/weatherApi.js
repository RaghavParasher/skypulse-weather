import axios from 'axios';

const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const AIR_QUALITY_BASE_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

/**
 * WMO Weather interpretation code mapping
 * https://open-meteo.com/en/docs
 */
export const WMO_CODES = {
  0: { label: 'Clear Sky', icon: 'clear', bg: 'sunny', nightBg: 'night' },
  1: { label: 'Mainly Clear', icon: 'partly-cloudy', bg: 'sunny', nightBg: 'night' },
  2: { label: 'Partly Cloudy', icon: 'partly-cloudy', bg: 'cloudy', nightBg: 'cloudy' },
  3: { label: 'Overcast Sky', icon: 'cloudy', bg: 'cloudy', nightBg: 'cloudy' },
  45: { label: 'Foggy', icon: 'fog', bg: 'fog', nightBg: 'fog' },
  48: { label: 'Depositing Rime Fog', icon: 'fog', bg: 'fog', nightBg: 'fog' },
  51: { label: 'Light Drizzle', icon: 'drizzle', bg: 'rain', nightBg: 'rain' },
  53: { label: 'Moderate Drizzle', icon: 'drizzle', bg: 'rain', nightBg: 'rain' },
  55: { label: 'Dense Drizzle', icon: 'drizzle', bg: 'rain', nightBg: 'rain' },
  56: { label: 'Light Freezing Drizzle', icon: 'freezing-rain', bg: 'rain', nightBg: 'rain' },
  57: { label: 'Dense Freezing Drizzle', icon: 'freezing-rain', bg: 'rain', nightBg: 'rain' },
  61: { label: 'Slight Rain', icon: 'rain', bg: 'rain', nightBg: 'rain' },
  63: { label: 'Moderate Rain', icon: 'rain', bg: 'rain', nightBg: 'rain' },
  65: { label: 'Heavy Rain', icon: 'heavy-rain', bg: 'rain', nightBg: 'rain' },
  66: { label: 'Light Freezing Rain', icon: 'freezing-rain', bg: 'rain', nightBg: 'rain' },
  67: { label: 'Heavy Freezing Rain', icon: 'freezing-rain', bg: 'rain', nightBg: 'rain' },
  71: { label: 'Slight Snowfall', icon: 'snow', bg: 'snow', nightBg: 'snow' },
  73: { label: 'Moderate Snowfall', icon: 'snow', bg: 'snow', nightBg: 'snow' },
  75: { label: 'Heavy Snowfall', icon: 'heavy-snow', bg: 'snow', nightBg: 'snow' },
  77: { label: 'Snow Grains', icon: 'snow', bg: 'snow', nightBg: 'snow' },
  80: { label: 'Slight Rain Showers', icon: 'showers', bg: 'rain', nightBg: 'rain' },
  81: { label: 'Moderate Rain Showers', icon: 'showers', bg: 'rain', nightBg: 'rain' },
  82: { label: 'Violent Rain Showers', icon: 'heavy-rain', bg: 'rain', nightBg: 'rain' },
  85: { label: 'Slight Snow Showers', icon: 'snow-showers', bg: 'snow', nightBg: 'snow' },
  86: { label: 'Heavy Snow Showers', icon: 'snow-showers', bg: 'snow', nightBg: 'snow' },
  95: { label: 'Thunderstorm', icon: 'thunderstorm', bg: 'storm', nightBg: 'storm' },
  96: { label: 'Thunderstorm with Slight Hail', icon: 'thunderstorm-hail', bg: 'storm', nightBg: 'storm' },
  99: { label: 'Thunderstorm with Heavy Hail', icon: 'thunderstorm-hail', bg: 'storm', nightBg: 'storm' }
};

export function getWeatherMeta(code, isDay = 1) {
  const meta = WMO_CODES[code] || { label: 'Unknown Weather', icon: 'cloudy', bg: 'cloudy', nightBg: 'night' };
  return {
    label: meta.label,
    icon: !isDay && (meta.icon === 'clear' || meta.icon === 'partly-cloudy') ? `night-${meta.icon}` : meta.icon,
    bg: isDay ? meta.bg : (meta.nightBg || 'night'),
    isDay: Boolean(isDay)
  };
}

/**
 * Fetch comprehensive weather forecast for specific latitude and longitude
 */
export async function getWeatherData(latitude, longitude, timezone = 'auto') {
  try {
    const params = {
      latitude,
      longitude,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'is_day',
        'precipitation',
        'rain',
        'showers',
        'snowfall',
        'weather_code',
        'cloud_cover',
        'pressure_msl',
        'surface_pressure',
        'wind_speed_10m',
        'wind_direction_10m',
        'wind_gusts_10m',
        'uv_index',
        'visibility'
      ].join(','),
      hourly: [
        'temperature_2m',
        'relative_humidity_2m',
        'dew_point_2m',
        'apparent_temperature',
        'precipitation_probability',
        'precipitation',
        'weather_code',
        'pressure_msl',
        'cloud_cover',
        'visibility',
        'wind_speed_10m',
        'wind_direction_10m',
        'uv_index'
      ].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'apparent_temperature_max',
        'apparent_temperature_min',
        'sunrise',
        'sunset',
        'daylight_duration',
        'sunshine_duration',
        'uv_index_max',
        'precipitation_sum',
        'rain_sum',
        'showers_sum',
        'snowfall_sum',
        'precipitation_hours',
        'precipitation_probability_max',
        'wind_speed_10m_max',
        'wind_gusts_10m_max',
        'wind_direction_10m_dominant'
      ].join(','),
      timezone,
      forecast_days: 7
    };

    const response = await axios.get(WEATHER_BASE_URL, { params, timeout: 10000 });
    return response.data;
  } catch (error) {
    if (!navigator.onLine) {
      throw new Error('NO_INTERNET');
    }
    throw new Error('API_ERROR');
  }
}

/**
 * Fetch live Air Quality data
 */
export async function getAirQualityData(latitude, longitude) {
  try {
    const params = {
      latitude,
      longitude,
      current: [
        'us_aqi',
        'pm10',
        'pm2_5',
        'carbon_monoxide',
        'nitrogen_dioxide',
        'sulphur_dioxide',
        'ozone'
      ].join(',')
    };

    const response = await axios.get(AIR_QUALITY_BASE_URL, { params, timeout: 8000 });
    return response.data;
  } catch (error) {
    console.warn('Air quality fetch failed or unavailable, returning null fallback');
    return null;
  }
}
