import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { useSettings } from '../context/SettingsContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatTemperature, formatTime } from '../utils/formatters';
import { getWeatherMeta } from '../services/weatherApi';
import { WeatherIcon } from './WeatherIcon';
import { FiRefreshCw, FiHeart, FiMapPin, FiCalendar, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { FloatingWeatherIcon3D } from './3d/FloatingWeatherIcon3D';

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
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full glass-panel rounded-[2.5rem] p-7 sm:p-10 relative overflow-hidden shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] border border-white/40 dark:border-white/20 backdrop-blur-3xl transition-all duration-500 group"
    >
      {/* Animated ambient background light orbs */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/10 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-gradient-to-tr from-sky-400/15 via-blue-600/15 to-transparent blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-1000" />

      {/* Top Bar: Location + Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/25 dark:border-white/15 pb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-600 to-sky-400 text-white shadow-xl shadow-blue-500/40 transform group-hover:rotate-6 transition-transform duration-500">
            <FiMapPin className="w-6 h-6 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
                {activeLocation.name}
              </h1>
              {activeLocation.country && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/30 dark:bg-slate-800/80 border border-white/40 dark:border-white/20 text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-md">
                  {activeLocation.country}
                </span>
              )}
            </div>
            {activeLocation.admin1 && activeLocation.admin1 !== activeLocation.name && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mt-1 flex items-center space-x-1.5">
                <span>{activeLocation.admin1}</span>
                <span>•</span>
                <span className="font-mono opacity-80">{activeLocation.latitude.toFixed(2)}°, {activeLocation.longitude.toFixed(2)}°</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Last updated + Refresh button */}
          <button
            onClick={refreshWeather}
            disabled={loading}
            title="Refresh weather forecast"
            className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/25 dark:bg-slate-900/60 border border-white/40 dark:border-white/20 text-xs font-bold hover:bg-white/45 dark:hover:bg-slate-800 transition-all text-slate-800 dark:text-slate-100 shadow-md hover:scale-105 disabled:opacity-50"
          >
            <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-500' : 'text-blue-500'}`} />
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
            className={`p-3 rounded-2xl transition-all duration-300 shadow-lg ${
              fav
                ? 'bg-rose-500/25 border border-rose-500/50 text-rose-500 shadow-rose-500/30 scale-105'
                : 'bg-white/25 dark:bg-slate-900/60 border border-white/40 dark:border-white/20 hover:bg-white/45 text-slate-700 dark:text-slate-200 hover:scale-105'
            }`}
          >
            <FiHeart className={`w-5 h-5 ${fav ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Hero Display: Temp + 3D Icon + High/Low */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 relative z-10">
        {/* Left column: Big temperature & Weather condition */}
        <div className="lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-6 sm:space-x-8">
            {/* 3D Floating Weather Sculpture Canvas */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/30 dark:bg-blue-400/20 rounded-full blur-2xl animate-pulse" />
              <Canvas
                camera={{ position: [0, 0, 3.5], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
              >
                <FloatingWeatherIcon3D
                  weatherType={getWeatherMeta(currentCode, isDay).type || 'clear'}
                  isDay={isDay === 1}
                />
              </Canvas>
            </div>

            <div>
              <div className="flex items-baseline">
                <span className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter bg-gradient-to-br from-slate-950 via-slate-800 to-blue-600 dark:from-white dark:via-slate-100 dark:to-blue-300 bg-clip-text text-transparent drop-shadow-md">
                  {formatTemperature(current.temperature_2m, tempUnit)}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                <span className="px-4 py-1.5 rounded-full text-sm sm:text-base font-extrabold bg-gradient-to-r from-blue-500/25 via-indigo-500/25 to-sky-500/25 dark:from-blue-500/35 dark:to-indigo-500/35 text-blue-800 dark:text-blue-200 border border-blue-400/40 shadow-sm">
                  {meta.label}
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/30 dark:bg-slate-800/80 border border-white/40 dark:border-white/20 text-slate-700 dark:text-slate-300">
                  {isDay ? '☀️ Daytime Atmosphere' : '🌙 Night Sky Conditions'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Atmospheric High / Low & Feels Like Capsule */}
        <div className="lg:col-span-4 flex flex-col space-y-3.5 bg-white/30 dark:bg-slate-900/60 rounded-3xl p-6 border border-white/40 dark:border-white/20 backdrop-blur-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between text-base font-bold">
            <span className="text-slate-600 dark:text-slate-300">Feels Like</span>
            <span className="text-xl font-black text-slate-900 dark:text-white bg-blue-500/15 dark:bg-blue-400/20 px-3 py-1 rounded-xl border border-blue-400/30">
              {formatTemperature(current.apparent_temperature, tempUnit)}
            </span>
          </div>

          <div className="flex items-center justify-between text-base font-bold border-t border-white/20 dark:border-white/10 pt-3.5">
            <span className="text-slate-600 dark:text-slate-300 flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-500">
                <FiArrowUp className="w-4 h-4" />
              </span>
              <span>Today's High</span>
            </span>
            <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
              {todayMax !== null ? formatTemperature(todayMax, tempUnit) : '--°'}
            </span>
          </div>

          <div className="flex items-center justify-between text-base font-bold border-t border-white/20 dark:border-white/10 pt-3.5">
            <span className="text-slate-600 dark:text-slate-300 flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                <FiArrowDown className="w-4 h-4" />
              </span>
              <span>Today's Low</span>
            </span>
            <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
              {todayMin !== null ? formatTemperature(todayMin, tempUnit) : '--°'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
