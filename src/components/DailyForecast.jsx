import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { useSettings } from '../context/SettingsContext';
import { formatTemperature } from '../utils/formatters';
import { getWeatherMeta } from '../services/weatherApi';
import { WeatherIcon } from './WeatherIcon';
import { FiCalendar, FiCloudRain } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const DailyForecast = () => {
  const { weatherData } = useWeather();
  const { tempUnit } = useSettings();

  if (!weatherData || !weatherData.daily || !weatherData.daily.time) return null;

  const daily = weatherData.daily;
  
  // Calculate weekly global min and max for range bar scaling
  const allMins = daily.temperature_2m_min || [];
  const allMaxs = daily.temperature_2m_max || [];
  const weekMin = Math.min(...allMins);
  const weekMax = Math.max(...allMaxs);
  const weekRange = (weekMax - weekMin) || 1;

  const days = daily.time.map((dateStr, idx) => {
    const code = daily.weather_code ? daily.weather_code[idx] : 0;
    const meta = getWeatherMeta(code, 1);
    const minTemp = allMins[idx];
    const maxTemp = allMaxs[idx];
    const rainProb = daily.precipitation_probability_max ? daily.precipitation_probability_max[idx] : 0;

    // Calculate bar width and offset percentage relative to week range
    const leftPercent = Math.max(0, Math.min(100, ((minTemp - weekMin) / weekRange) * 100));
    const widthPercent = Math.max(12, Math.min(100 - leftPercent, ((maxTemp - minTemp) / weekRange) * 100));

    // Day name (Today, Saturday, etc.)
    const dateObj = new Date(`${dateStr}T00:00:00`);
    const isToday = idx === 0;
    const dayName = isToday ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });

    return {
      id: `${dateStr}-${idx}`,
      dayName,
      isToday,
      minTemp,
      maxTemp,
      leftPercent,
      widthPercent,
      icon: meta.icon,
      label: meta.label,
      rainProb
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full glass-panel rounded-3xl p-6 sm:p-8 border-white/30 dark:border-white/15 backdrop-blur-2xl shadow-xl relative"
    >
      {/* Header */}
      <div className="flex items-center space-x-2.5 text-slate-700 dark:text-slate-200 mb-6">
        <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-500 shadow-sm">
          <FiCalendar className="w-5 h-5 animate-pulse" />
        </span>
        <h2 className="text-lg sm:text-xl font-extrabold tracking-tight uppercase">7-Day Forecast</h2>
      </div>

      {/* 7-Day List */}
      <div className="space-y-3">
        {days.map((day, idx) => (
          <motion.div
            key={day.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-300 ${
              day.isToday
                ? 'bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-transparent border border-blue-400/30'
                : 'hover:bg-white/30 dark:hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            {/* Day Name & Rain Prob */}
            <div className="w-24 sm:w-32 flex items-center space-x-2 shrink-0">
              <span className={`text-sm sm:text-base font-bold truncate ${day.isToday ? 'text-blue-500 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}>
                {day.dayName}
              </span>
              {day.rainProb > 20 && (
                <span className="flex items-center space-x-0.5 px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-bold">
                  <FiCloudRain className="w-2.5 h-2.5" />
                  <span>{Math.round(day.rainProb)}%</span>
                </span>
              )}
            </div>

            {/* Weather Icon & Label */}
            <div className="flex items-center space-x-3 flex-1 justify-start px-2">
              <WeatherIcon iconCode={day.icon} size="sm" animate={false} />
              <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hidden md:inline truncate">
                {day.label}
              </span>
            </div>

            {/* Min Temp */}
            <span className="w-12 text-right text-sm font-bold text-slate-500 dark:text-slate-400 font-mono shrink-0">
              {formatTemperature(day.minTemp, tempUnit)}
            </span>

            {/* Apple Weather Style Visual Temperature Bar */}
            <div className="w-28 sm:w-44 h-2 bg-slate-300/60 dark:bg-slate-800 rounded-full overflow-hidden mx-3 relative flex items-center shrink-0">
              <div
                className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-500 shadow-sm"
                style={{
                  left: `${day.leftPercent}%`,
                  width: `${day.widthPercent}%`
                }}
              />
            </div>

            {/* Max Temp */}
            <span className="w-12 text-left text-sm font-extrabold text-slate-900 dark:text-white font-mono shrink-0">
              {formatTemperature(day.maxTemp, tempUnit)}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
