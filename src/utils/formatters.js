/**
 * Temperature conversion functions
 */
export function formatTemperature(tempCelsius, unit = 'celsius') {
  if (tempCelsius === undefined || tempCelsius === null || isNaN(tempCelsius)) return '--°';
  if (unit === 'fahrenheit') {
    const tempF = (tempCelsius * 9) / 5 + 32;
    return `${Math.round(tempF)}°`;
  }
  return `${Math.round(tempCelsius)}°`;
}

/**
 * Wind speed conversion functions
 */
export function formatWindSpeed(speedKmh, unit = 'kmh') {
  if (speedKmh === undefined || speedKmh === null || isNaN(speedKmh)) return '--';
  if (unit === 'mph') {
    const speedMph = speedKmh * 0.621371;
    return `${Math.round(speedMph)} mph`;
  }
  return `${Math.round(speedKmh)} km/h`;
}

/**
 * Convert degrees to cardinal wind direction
 */
export function getWindDirectionLabel(degrees) {
  if (degrees === undefined || degrees === null) return 'N/A';
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((degrees % 360) / 45) % 8;
  return directions[index];
}

/**
 * UV Index level formatting
 */
export function getUVLevel(uvIndex) {
  if (uvIndex === undefined || uvIndex === null) return { level: 'Unknown', color: 'text-slate-400', barColor: 'bg-slate-400' };
  if (uvIndex <= 2) return { level: 'Low', color: 'text-emerald-400', barColor: 'bg-emerald-500' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'text-amber-400', barColor: 'bg-amber-500' };
  if (uvIndex <= 7) return { level: 'High', color: 'text-orange-400', barColor: 'bg-orange-500' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-400', barColor: 'bg-red-500' };
  return { level: 'Extreme', color: 'text-purple-400', barColor: 'bg-purple-500' };
}

/**
 * Air Quality Index descriptor
 */
export function getAQILevel(aqi) {
  if (aqi === undefined || aqi === null) return { label: 'Good (Estimated)', color: 'text-emerald-400', bg: 'bg-emerald-500/20 text-emerald-300', advice: 'Air quality is satisfactory, and air pollution poses little or no risk.' };
  if (aqi <= 50) return { label: 'Good', color: 'text-emerald-400', bg: 'bg-emerald-500/20 text-emerald-300', advice: 'Air quality is considered satisfactory, and air pollution poses little or no risk.' };
  if (aqi <= 100) return { label: 'Moderate', color: 'text-amber-400', bg: 'bg-amber-500/20 text-amber-300', advice: 'Air quality is acceptable; however, sensitive individuals may experience minor irritation.' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: 'text-orange-400', bg: 'bg-orange-500/20 text-orange-300', advice: 'Members of sensitive groups may experience health effects. General public is less likely to be affected.' };
  if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-400', bg: 'bg-red-500/20 text-red-300', advice: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious effects.' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: 'text-purple-400', bg: 'bg-purple-500/20 text-purple-300', advice: 'Health warnings of emergency conditions. The entire population is more likely to be affected.' };
  return { label: 'Hazardous', color: 'text-rose-600', bg: 'bg-rose-600/30 text-rose-200', advice: 'Health alert: everyone may experience more serious health effects. Avoid outdoor activity.' };
}

/**
 * Humidity comfort descriptor
 */
export function getHumidityComfort(humidity) {
  if (humidity === undefined || humidity === null) return 'N/A';
  if (humidity < 30) return 'Dry (Slightly arid)';
  if (humidity <= 60) return 'Comfortable (Optimal dew point)';
  if (humidity <= 80) return 'Humid (Sticky feeling outdoor)';
  return 'Oppressive (High moisture levels)';
}

/**
 * Pressure descriptor
 */
export function getPressureStatus(pressureHpa) {
  if (!pressureHpa) return 'Normal';
  if (pressureHpa < 1000) return 'Low Pressure (Stormy / Rainy likely)';
  if (pressureHpa <= 1020) return 'Normal Pressure (Stable weather)';
  return 'High Pressure (Clear / Dry conditions)';
}

/**
 * Visibility descriptor
 */
export function formatVisibility(meters, unit = 'kmh') {
  if (meters === undefined || meters === null) return '--';
  const km = meters / 1000;
  if (unit === 'mph') {
    const miles = km * 0.621371;
    return `${miles.toFixed(1)} mi (${miles >= 6 ? 'Clear view' : 'Restricted view'})`;
  }
  return `${km.toFixed(1)} km (${km >= 10 ? 'Clear view' : 'Restricted view'})`;
}

/**
 * Format time string according to 12h/24h setting
 */
export function formatTime(isoStringOrDate, timeFormat = '12h') {
  if (!isoStringOrDate) return '--:--';
  try {
    const date = typeof isoStringOrDate === 'string' ? new Date(isoStringOrDate) : isoStringOrDate;
    if (isNaN(date.getTime())) return '--:--';
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: timeFormat === '12h'
    });
  } catch {
    return '--:--';
  }
}

/**
 * Format date string nicely (e.g. "Friday, July 17")
 */
export function formatDate(isoStringOrDate) {
  if (!isoStringOrDate) return '';
  try {
    const date = typeof isoStringOrDate === 'string' ? new Date(isoStringOrDate) : isoStringOrDate;
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return '';
  }
}

/**
 * Format relative time (e.g. "Just now", "5m ago")
 */
export function formatRelativeTime(date) {
  if (!date) return 'Just now';
  const now = new Date();
  const diffSec = Math.floor((now - date) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  return `${diffHour}h ago`;
}
