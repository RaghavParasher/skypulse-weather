import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { formatTemperature } from '../utils/formatters';
import { WeatherIcon } from './WeatherIcon';
import { FiCloudRain } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const ForecastCard = ({ timeLabel, iconCode, temp, rainProb, subLabel, isActive = false }) => {
  const { tempUnit } = useSettings();

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -6 }}
      className={`flex flex-col items-center justify-between p-4 rounded-[1.75rem] min-w-[110px] shrink-0 transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-b from-blue-500 via-indigo-600 to-blue-700 text-white shadow-xl shadow-blue-500/40 border border-white/40 scale-105'
          : 'glass-card text-slate-800 dark:text-slate-100 hover:bg-white/45 dark:hover:bg-slate-800/80 border border-white/40 dark:border-white/15'
      }`}
    >
      <span className="text-xs font-black font-mono uppercase tracking-wider opacity-90">{timeLabel}</span>

      <div className="my-3 transform hover:scale-110 transition-transform">
        <WeatherIcon iconCode={iconCode} size="md" animate={true} />
      </div>

      <span className="text-2xl font-black tracking-tight drop-shadow-sm">
        {formatTemperature(temp, tempUnit)}
      </span>

      {rainProb !== undefined && rainProb !== null && rainProb > 0 ? (
        <div className="flex items-center space-x-1 mt-2 px-2.5 py-0.5 rounded-full bg-blue-500/25 text-blue-300 text-xs font-black border border-blue-400/30 shadow-sm">
          <FiCloudRain className="w-3.5 h-3.5 text-blue-300" />
          <span>{Math.round(rainProb)}%</span>
        </div>
      ) : (
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2">{subLabel || 'Clear'}</span>
      )}
    </motion.div>
  );
};
