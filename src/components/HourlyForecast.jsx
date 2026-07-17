import React, { useRef } from 'react';
import { useWeather } from '../context/WeatherContext';
import { useSettings } from '../context/SettingsContext';
import { formatTime, formatTemperature, formatWindSpeed } from '../utils/formatters';
import { getWeatherMeta } from '../services/weatherApi';
import { ForecastCard } from './ForecastCard';
import { FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const HourlyForecast = () => {
  const { weatherData } = useWeather();
  const { timeFormat, windUnit } = useSettings();
  const scrollContainerRef = useRef(null);

  if (!weatherData || !weatherData.hourly) return null;

  const hourly = weatherData.hourly;
  const now = new Date();
  const currentHourIndex = hourly.time.findIndex((t) => new Date(t) >= now) || 0;
  
  // Get next 24 hours starting from current or nearest hour
  const startIndex = Math.max(0, currentHourIndex);
  const next24Hours = hourly.time.slice(startIndex, startIndex + 24).map((timeStr, idx) => {
    const realIndex = startIndex + idx;
    const code = hourly.weather_code[realIndex];
    // check if hour is daytime (between 6 AM and 6 PM approximately or check sun)
    const hourNum = new Date(timeStr).getHours();
    const isDayHour = hourNum >= 6 && hourNum < 20 ? 1 : 0;
    const meta = getWeatherMeta(code, isDayHour);

    return {
      id: `${timeStr}-${realIndex}`,
      time: timeStr,
      timeLabel: idx === 0 ? 'Now' : formatTime(timeStr, timeFormat),
      temp: hourly.temperature_2m[realIndex],
      rainProb: hourly.precipitation_probability ? hourly.precipitation_probability[realIndex] : 0,
      windSpeed: hourly.wind_speed_10m ? hourly.wind_speed_10m[realIndex] : 0,
      icon: meta.icon,
      label: meta.label,
      isNow: idx === 0
    };
  });

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full glass-panel rounded-[2.5rem] p-7 sm:p-9 border border-white/40 dark:border-white/20 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-7 border-b border-white/20 pb-4">
        <div className="flex items-center space-x-3 text-slate-800 dark:text-slate-100">
          <span className="p-3 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
            <FiClock className="w-5 h-5 animate-pulse" />
          </span>
          <h2 className="text-xl font-black tracking-tight uppercase">24-Hour Forecast Curve</h2>
        </div>

        {/* Scroll navigation arrows */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full glass-card hover:bg-white/40 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all active:scale-90"
            title="Scroll left"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full glass-card hover:bg-white/40 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all active:scale-90"
            title="Scroll right"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Strip */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent snap-x"
      >
        {next24Hours.map((hour) => (
          <div key={hour.id} className="snap-start">
            <ForecastCard
              timeLabel={hour.timeLabel}
              iconCode={hour.icon}
              temp={hour.temp}
              rainProb={hour.rainProb}
              subLabel={formatWindSpeed(hour.windSpeed, windUnit)}
              isActive={hour.isNow}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
