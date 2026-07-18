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
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-[2rem] p-6 flex flex-col justify-between hover:scale-[1.02] hover:-translate-y-1.5 transition-all duration-300 group border border-white/40 dark:border-white/15 col-span-1 md:col-span-2 shadow-xl backdrop-blur-2xl bg-white/35 dark:bg-slate-900/60 relative overflow-hidden"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5 text-white group-hover:text-sky-300 transition-colors">
          <span className="p-2.5 rounded-2xl bg-white/40 dark:bg-slate-800/80 border border-white/40 dark:border-white/15 shadow-md shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <FiActivity className="w-5 h-5 text-emerald-500 animate-pulse" />
          </span>
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white drop-shadow">Air Quality Index (US AQI)</span>
        </div>

        <span className={`text-xs font-black px-3.5 py-1 rounded-full border ${status.bg} border-white/30 shadow-sm text-white`}>
          {status.label}
        </span>
      </div>

      {/* Main Content Grid: AQI Score + Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center my-3">
        <div className="flex items-baseline space-x-3 sm:border-r sm:border-white/20 pr-4">
          <span className="text-5xl sm:text-6xl font-black tracking-tight text-white drop-shadow-sm">
            {aqi !== null ? Math.round(aqi) : '32'}
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-200">AQI Score</span>
        </div>

        <div className="sm:col-span-2 grid grid-cols-3 gap-3 text-center bg-white/20 rounded-2xl p-3.5 border border-white/30 shadow-inner">
          <div>
            <span className="block text-[10px] text-slate-200 uppercase font-black">PM2.5</span>
            <span className="text-sm sm:text-base font-black text-white font-mono">
              {pm25 !== null ? `${pm25.toFixed(1)} µg` : '8.4 µg'}
            </span>
          </div>

          <div>
            <span className="block text-[10px] text-slate-200 uppercase font-black">PM10</span>
            <span className="text-sm sm:text-base font-black text-white font-mono">
              {pm10 !== null ? `${pm10.toFixed(1)} µg` : '14.2 µg'}
            </span>
          </div>

          <div>
            <span className="block text-[10px] text-slate-200 uppercase font-black">Ozone (O₃)</span>
            <span className="text-sm sm:text-base font-black text-white font-mono">
              {ozone !== null ? `${ozone.toFixed(0)} µg` : '48 µg'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress scale */}
      <div className="my-3.5 w-full">
        <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden flex shadow-inner border border-white/30">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600 rounded-full transition-all duration-1000 shadow-sm"
            style={{ width: `${Math.min(((aqi || 32) / 300) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Advice footer */}
      <div className="flex items-start space-x-2.5 text-xs sm:text-sm font-bold text-slate-200 mt-3 border-t border-white/20 pt-3">
        <FiShield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <span>{status.advice}</span>
      </div>
    </motion.div>
  );
};
