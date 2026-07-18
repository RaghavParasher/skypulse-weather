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
      className="w-full glass-panel rounded-[2.5rem] p-7 sm:p-9 border border-white/40 dark:border-white/20 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-7 border-b border-white/20 pb-4">
        <div className="flex items-center space-x-3 text-white">
          <span className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
            <FiCalendar className="w-5 h-5 animate-pulse" />
          </span>
          <h2 className="text-xl font-black tracking-tight uppercase text-white drop-shadow">7-Day Forecast & Temperature Range</h2>
        </div>
        <button
          type="button"
          onClick={() => alert('Displaying 7-Day Temperature Range & Weather Trends')}
          className="text-xs font-bold text-white px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/35 border border-white/30 shadow transition-all active:scale-95 cursor-pointer"
        >
          Weekly Outlook
        </button>
      </div>

      {/* 7-Day List */}
      <div className="space-y-3.5">
        {days.map((day, idx) => (
          <motion.div
            key={day.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            onClick={() => alert(`${day.dayName}: ${day.label}. High: ${formatTemperature(day.maxTemp, tempUnit)}, Low: ${formatTemperature(day.minTemp, tempUnit)}`)}
            className={`flex items-center justify-between p-4 sm:p-5 rounded-[1.75rem] transition-all duration-300 cursor-pointer ${
              day.isToday
                ? 'bg-gradient-to-r from-blue-500/35 via-indigo-500/25 to-transparent border border-blue-400/60 shadow-md scale-[1.01]'
                : 'glass-card hover:bg-white/25 border border-white/30 shadow-md hover:scale-[1.01]'
            }`}
          >
            {/* Day Name & Rain Prob */}
            <div className="w-28 sm:w-36 flex items-center space-x-2.5 shrink-0">
              <span className={`text-base sm:text-lg font-black truncate ${day.isToday ? 'text-sky-300 drop-shadow-sm' : 'text-white'}`}>
                {day.dayName}
              </span>
              {day.rainProb > 20 && (
                <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-blue-500/30 text-sky-200 text-xs font-black border border-blue-400/40 shadow-sm">
                  <FiCloudRain className="w-3 h-3 text-sky-300" />
                  <span>{Math.round(day.rainProb)}%</span>
                </span>
              )}
            </div>

            {/* Weather Icon & Label */}
            <div className="flex items-center space-x-3.5 flex-1 justify-start px-3">
              <div className="transform hover:scale-125 transition-transform duration-300">
                <WeatherIcon iconCode={day.icon} size="sm" animate={false} />
              </div>
              <span className="text-sm font-extrabold text-slate-200 hidden md:inline truncate">
                {day.label}
              </span>
            </div>

            {/* Min Temp */}
            <span className="w-14 text-right text-base font-black text-slate-200 font-mono shrink-0">
              {formatTemperature(day.minTemp, tempUnit)}
            </span>

            {/* Apple Weather Style Visual Temperature Bar */}
            <div className="w-32 sm:w-52 h-3 bg-white/20 rounded-full overflow-hidden mx-4 relative flex items-center shrink-0 shadow-inner border border-white/30">
              <div
                className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                style={{
                  left: `${day.leftPercent}%`,
                  width: `${day.widthPercent}%`
                }}
              />
            </div>

            {/* Max Temp */}
            <span className="w-14 text-left text-base font-black text-white font-mono shrink-0 drop-shadow-sm">
              {formatTemperature(day.maxTemp, tempUnit)}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
