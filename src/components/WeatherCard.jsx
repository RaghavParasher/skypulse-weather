import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { useSettings } from '../context/SettingsContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatTemperature, formatTime } from '../utils/formatters';
import { getWeatherMeta } from '../services/weatherApi';
import { WeatherIcon } from './WeatherIcon';
import { FiRefreshCw, FiHeart, FiMapPin, FiCalendar, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const WeatherCard = () => {
  const { activeLocation, weatherData, lastUpdated, refreshWeather, loading } = useWeather();
  const { tempUnit, timeFormat } = useSettings();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (!weatherData || !weatherData.current) return null;

  const current = weatherData.current;
  const daily = weatherData.daily || {};
  const currentCode = current.weather_code ?? 0;
  const isDay = current.is_day ?? 1;
  const meta = getWeatherMeta(currentCode, isDay);

  const todayMax = daily.temperature_2m_max ? daily.temperature_2m_max[0] : null;
  const todayMin = daily.temperature_2m_min ? daily.temperature_2m_min[0] : null;

  const fav = isFavorite(activeLocation);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl border-white/30 dark:border-white/15 backdrop-blur-2xl"
    >
      {/* Background ambient glow circle */}
      <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-blue-500/10 dark:bg-blue-400/10 blur-3xl pointer-events-none" />

      {/* Top Bar: Location + Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 dark:border-white/10 pb-5">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/30">
            <FiMapPin className="w-5 h-5 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {activeLocation.name}
              </h1>
              {activeLocation.country && (
                <span className="glass-pill px-2.5 py-0.5 text-xs font-semibold bg-white/30 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {activeLocation.country}
                </span>
              )}
            </div>
            {activeLocation.admin1 && activeLocation.admin1 !== activeLocation.name && (
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {activeLocation.admin1} • {activeLocation.latitude.toFixed(2)}°, {activeLocation.longitude.toFixed(2)}°
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* Last updated + Refresh button */}
          <button
            onClick={refreshWeather}
            disabled={loading}
            title="Refresh weather forecast"
            className="flex items-center space-x-1.5 glass-pill px-3 py-1.5 text-xs hover:bg-white/40 dark:hover:bg-slate-800/80 transition-all text-slate-700 dark:text-slate-200 disabled:opacity-50"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-400' : ''}`} />
            <span className="hidden sm:inline">
              Updated {lastUpdated ? formatTime(lastUpdated, timeFormat) : 'Now'}
            </span>
          </button>

          {/* Favorite Toggle Button */}
          <button
            onClick={() => {
              if (fav) removeFavorite(activeLocation.id || `${activeLocation.name}-${activeLocation.latitude}-${activeLocation.longitude}`);
              else addFavorite(activeLocation);
            }}
            title={fav ? 'Remove city from Favorites' : 'Save city to Favorites'}
            className={`p-2.5 rounded-2xl glass-card transition-all duration-300 ${
              fav ? 'bg-rose-500/20 border-rose-500/40 text-rose-500 shadow-rose-500/20 shadow-md' : 'hover:bg-white/40 text-slate-600 dark:text-slate-300'
            }`}
          >
            <FiHeart className={`w-5 h-5 ${fav ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Hero Display: Temp + Icon + High/Low */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-6">
        <div className="flex items-center space-x-6">
          <WeatherIcon iconCode={meta.icon} size="2xl" animate={true} />
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter bg-gradient-to-br from-slate-900 via-slate-800 to-blue-600 dark:from-white dark:via-slate-100 dark:to-blue-300 bg-clip-text text-transparent">
                {formatTemperature(current.temperature_2m, tempUnit)}
              </span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <span className="px-3.5 py-1 rounded-full text-sm sm:text-base font-bold bg-blue-500/20 dark:bg-blue-500/30 text-blue-700 dark:text-blue-200 border border-blue-400/30">
                {meta.label}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3.5 bg-white/20 dark:bg-slate-900/40 rounded-2xl p-5 border border-white/20 dark:border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between text-sm sm:text-base font-medium">
            <span className="text-slate-600 dark:text-slate-400">Feels Like</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {formatTemperature(current.apparent_temperature, tempUnit)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm sm:text-base font-medium border-t border-white/10 pt-3">
            <span className="text-slate-600 dark:text-slate-400 flex items-center space-x-1">
              <FiArrowUp className="w-4 h-4 text-emerald-500" />
              <span>Today's High</span>
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {todayMax !== null ? formatTemperature(todayMax, tempUnit) : '--°'}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm sm:text-base font-medium border-t border-white/10 pt-3">
            <span className="text-slate-600 dark:text-slate-400 flex items-center space-x-1">
              <FiArrowDown className="w-4 h-4 text-blue-400" />
              <span>Today's Low</span>
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {todayMin !== null ? formatTemperature(todayMin, tempUnit) : '--°'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
