import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { TemperatureChart } from '../components/charts/TemperatureChart';
import { HumidityChart } from '../components/charts/HumidityChart';
import { WindChart } from '../components/charts/WindChart';
import { RainChart } from '../components/charts/RainChart';
import { HourlyForecast } from '../components/HourlyForecast';
import { DailyForecast } from '../components/DailyForecast';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { FiTrendingUp, FiDroplet, FiWind, FiCloudRain, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const Forecast = () => {
  const { weatherData, loading } = useWeather();
  const [activeTab, setActiveTab] = useState('temp'); // temp | humidity | wind | rain

  if (loading && !weatherData) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <LoadingSkeleton />
      </main>
    );
  }

  const tabs = [
    { id: 'temp', label: 'Temperature', icon: <FiTrendingUp className="w-4 h-4" /> },
    { id: 'humidity', label: 'Humidity', icon: <FiDroplet className="w-4 h-4" /> },
    { id: 'wind', label: 'Wind Speed', icon: <FiWind className="w-4 h-4" /> },
    { id: 'rain', label: 'Precipitation', icon: <FiCloudRain className="w-4 h-4" /> },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border-white/30 backdrop-blur-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-md">
            <FiBarChart2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Deep-Dive Forecast Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Explore 24-hour trends and 7-day atmospheric projections across all metrics.
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-1.5 rounded-2xl glass-card p-1.5 border-white/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-800/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Container */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-panel rounded-3xl p-6 sm:p-8 border-white/30 backdrop-blur-2xl shadow-2xl"
      >
        <div className="mb-4">
          <h2 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            {tabs.find((t) => t.id === activeTab)?.label} Trend Curve (Next 24 Hours)
          </h2>
        </div>

        {activeTab === 'temp' && <TemperatureChart />}
        {activeTab === 'humidity' && <HumidityChart />}
        {activeTab === 'wind' && <WindChart />}
        {activeTab === 'rain' && <RainChart />}
      </motion.div>

      {/* Hourly and Daily Overviews */}
      <div className="space-y-8 pb-12">
        <HourlyForecast />
        <DailyForecast />
      </div>
    </main>
  );
};
