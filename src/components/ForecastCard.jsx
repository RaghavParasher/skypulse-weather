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
      whileHover={{ scale: 1.05, y: -4 }}
      className={`flex flex-col items-center justify-between p-4 rounded-3xl min-w-[100px] shrink-0 transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-b from-blue-500/80 to-indigo-600/80 text-white shadow-lg shadow-blue-500/30 border border-white/30'
          : 'glass-card text-slate-800 dark:text-slate-100 hover:bg-white/40 dark:hover:bg-slate-800/80 border-white/30 dark:border-white/10'
      }`}
    >
      <span className="text-xs font-bold font-mono uppercase tracking-wider">{timeLabel}</span>

      <div className="my-2.5">
        <WeatherIcon iconCode={iconCode} size="md" animate={true} />
      </div>

      <span className="text-xl font-extrabold tracking-tight">
        {formatTemperature(temp, tempUnit)}
      </span>

      {rainProb !== undefined && rainProb !== null && rainProb > 0 ? (
        <div className="flex items-center space-x-1 mt-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-bold">
          <FiCloudRain className="w-3 h-3 text-blue-400" />
          <span>{Math.round(rainProb)}%</span>
        </div>
      ) : (
        <span className="text-[11px] text-slate-400 mt-1">{subLabel || 'Clear'}</span>
      )}
    </motion.div>
  );
};
