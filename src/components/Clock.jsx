import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useWeather } from '../context/WeatherContext';
import { formatTime, formatDate } from '../utils/formatters';
import { FiClock } from 'react-icons/fi';

export const Clock = () => {
  const { timeFormat } = useSettings();
  const { activeLocation } = useWeather();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = formatTime(currentTime, timeFormat);
  const formattedDate = formatDate(currentTime);

  return (
    <div className="hidden lg:flex items-center space-x-3 glass-pill px-4 py-1.5 border-white/20 dark:border-white/10 text-slate-800 dark:text-slate-100 shadow-sm transition-all duration-300">
      <FiClock className="w-4 h-4 text-blue-400 animate-pulse" />
      <div className="flex flex-col text-right leading-tight">
        <span className="text-sm font-bold tracking-tight font-mono">{formattedTime}</span>
        <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">{formattedDate}</span>
      </div>
    </div>
  );
};
