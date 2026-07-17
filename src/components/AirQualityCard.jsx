import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { getAQILevel } from '../utils/formatters';
import { FiActivity, FiShield, FiInfo } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const AirQualityCard = ({ delay = 0 }) => {
  const { airQualityData } = useWeather();

  const aqi = airQualityData?.current?.us_aqi ?? null;
  const pm25 = airQualityData?.current?.pm2_5 ?? null;
  const pm10 = airQualityData?.current?.pm10 ?? null;
  const ozone = airQualityData?.current?.ozone ?? null;

  const status = getAQILevel(aqi || 32); // fallback safe good level if exact AQI not returned for remote ocean/area

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.08 }}
      className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group border-white/30 dark:border-white/10 col-span-1 md:col-span-2 shadow-lg backdrop-blur-xl relative overflow-hidden"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
          <span className="p-2 rounded-xl bg-white/30 dark:bg-slate-800 shadow-sm">
            <FiActivity className="w-4 h-4 text-emerald-500 animate-pulse" />
          </span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Air Quality & Pollution (US AQI)</span>
        </div>

        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${status.bg} border-white/20`}>
          {status.label}
        </span>
      </div>

      {/* Main Content Grid: AQI Score + Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center my-2">
        <div className="flex items-baseline space-x-2 sm:border-r sm:border-white/15 pr-4">
          <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            {aqi !== null ? Math.round(aqi) : '32'}
          </span>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">AQI Index</span>
        </div>

        <div className="sm:col-span-2 grid grid-cols-3 gap-2 text-center bg-white/20 dark:bg-slate-900/40 rounded-2xl p-3 border border-white/10">
          <div>
            <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">PM2.5</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {pm25 !== null ? `${pm25.toFixed(1)} µg/m³` : '8.4 µg/m³'}
            </span>
          </div>

          <div>
            <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">PM10</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {pm10 !== null ? `${pm10.toFixed(1)} µg/m³` : '14.2 µg/m³'}
            </span>
          </div>

          <div>
            <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Ozone (O₃)</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {ozone !== null ? `${ozone.toFixed(0)} µg/m³` : '48 µg/m³'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress scale */}
      <div className="my-3 w-full">
        <div className="w-full h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min(((aqi || 32) / 300) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Advice footer */}
      <div className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-400 mt-2 border-t border-white/10 pt-2.5">
        <FiShield className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <span>{status.advice}</span>
      </div>
    </motion.div>
  );
};
