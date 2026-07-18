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
    <div className="hidden lg:flex items-center space-x-3 glass-pill px-4 py-1.5 border-white/30 text-white shadow font-bold transition-all duration-300">
      <FiClock className="w-4 h-4 text-sky-400 animate-pulse" />
      <div className="flex flex-col text-right leading-tight">
        <span className="text-sm font-black tracking-tight font-mono text-white">{formattedTime}</span>
        <span className="text-xs text-slate-200 font-semibold">{formattedDate}</span>
      </div>
    </div>
  );
};
