import React, { useState, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import { useSettings } from '../context/SettingsContext';
import { getWeatherData, getWeatherMeta } from '../services/weatherApi';
import { formatTemperature } from '../utils/formatters';
import { WeatherIcon } from './WeatherIcon';
import { FiTrash2, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const FavoriteCard = ({ location, onRemove, onSelect }) => {
  const { tempUnit } = useSettings();
  const [weatherSummary, setWeatherSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchMiniWeather() {
      try {
        const data = await getWeatherData(location.latitude, location.longitude, location.timezone || 'auto');
        if (isMounted && data && data.current) {
          const code = data.current.weather_code ?? 0;
          const isDay = data.current.is_day ?? 1;
          const meta = getWeatherMeta(code, isDay);
          setWeatherSummary({
            temp: data.current.temperature_2m,
            high: data.daily?.temperature_2m_max ? data.daily.temperature_2m_max[0] : null,
            low: data.daily?.temperature_2m_min ? data.daily.temperature_2m_min[0] : null,
            meta
          });
        }
      } catch (err) {
        // keep fallback
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchMiniWeather();
    return () => { isMounted = false; };
  }, [location]);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={() => onSelect(location)}
      className="glass-card rounded-3xl p-6 cursor-pointer hover:border-blue-400/60 transition-all duration-300 relative overflow-hidden group shadow-xl border-white/30 dark:border-white/10 backdrop-blur-xl flex flex-col justify-between h-48"
    >
      {/* Top row: City Name + Remove Button */}
      <div className="flex items-start justify-between z-10">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex items-center space-x-1.5">
            <span>{location.name}</span>
            <FiArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0" />
          </h3>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
            {location.country || (location.admin1 !== location.name ? location.admin1 : 'Saved Location')}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(location.id || `${location.name}-${location.latitude}-${location.longitude}`);
          }}
          className="p-2 rounded-full hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 transition-colors shrink-0"
          title="Remove from Favorites"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom row: Temperature & Weather Icon */}
      <div className="flex items-end justify-between z-10 mt-4">
        <div>
          {loading ? (
            <div className="h-10 w-24 bg-white/20 dark:bg-slate-800 animate-pulse rounded-xl" />
          ) : weatherSummary ? (
            <div>
              <span className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                {formatTemperature(weatherSummary.temp, tempUnit)}
              </span>
              {weatherSummary.high !== null && (
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
                  H: {formatTemperature(weatherSummary.high, tempUnit)} • L: {formatTemperature(weatherSummary.low, tempUnit)}
                </p>
              )}
            </div>
          ) : (
            <span className="text-lg font-bold text-slate-400">Offline</span>
          )}
        </div>

        {weatherSummary && weatherSummary.meta && (
          <div className="flex flex-col items-end">
            <WeatherIcon iconCode={weatherSummary.meta.icon} size="lg" animate={true} />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1">
              {weatherSummary.meta.label}
            </span>
          </div>
        )}
      </div>

      {/* Subtle background glow */}
      <div className="absolute right-0 bottom-0 w-36 h-36 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
    </motion.div>
  );
};
