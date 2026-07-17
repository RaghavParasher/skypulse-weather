import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { FiAlertTriangle, FiWifiOff, FiMapPin, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const ErrorPage = ({ onOpenSearch }) => {
  const { error, refreshWeather, triggerGeolocation, loading } = useWeather();

  const getErrorContent = () => {
    switch (error) {
      case 'NO_INTERNET':
        return {
          icon: <FiWifiOff className="w-16 h-16 text-rose-500 animate-pulse" />,
          title: 'No Internet Connection',
          desc: 'It looks like you are offline or lost network connectivity. Please verify your connection and retry.',
          actionLabel: 'Retry Connection',
          onAction: refreshWeather
        };
      case 'PERMISSION_DENIED':
        return {
          icon: <FiMapPin className="w-16 h-16 text-amber-500 animate-bounce" />,
          title: 'Location Access Denied',
          desc: 'We could not detect your GPS location because permission was denied. You can manually search for your city below!',
          actionLabel: 'Search City Manually',
          onAction: onOpenSearch
        };
      case 'NOT_FOUND':
        return {
          icon: <FiSearch className="w-16 h-16 text-blue-500" />,
          title: 'City Not Found',
          desc: 'The city you searched for could not be located in Open-Meteo geocoding database. Please check the spelling or try a nearby major city.',
          actionLabel: 'Try Another Search',
          onAction: onOpenSearch
        };
      default:
        return {
          icon: <FiAlertTriangle className="w-16 h-16 text-amber-500 animate-pulse" />,
          title: 'Forecast Unavailable',
          desc: 'We encountered a problem fetching data from Open-Meteo weather servers. Please click retry below or try again in a moment.',
          actionLabel: 'Reload Forecast',
          onAction: refreshWeather
        };
    }
  };

  const content = getErrorContent();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-lg mx-auto my-12 glass-panel rounded-3xl p-8 text-center border-white/30 shadow-2xl backdrop-blur-2xl flex flex-col items-center justify-center space-y-6"
    >
      <div className="p-4 rounded-3xl bg-white/30 dark:bg-slate-800 shadow-md">
        {content.icon}
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {content.title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
          {content.desc}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-2">
        <button
          onClick={content.onAction}
          disabled={loading}
          className="flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50"
        >
          <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{content.actionLabel}</span>
        </button>

        {error !== 'PERMISSION_DENIED' && onOpenSearch && (
          <button
            onClick={onOpenSearch}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl glass-card hover:bg-white/40 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all"
          >
            <FiSearch className="w-4 h-4 text-blue-400" />
            <span>Search City</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
