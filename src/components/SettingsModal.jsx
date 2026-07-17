import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { FiX, FiThermometer, FiWind, FiClock, FiMonitor, FiTrash2, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const SettingsModal = ({ isOpen, onClose }) => {
  const { tempUnit, windUnit, theme, timeFormat, updateSetting, clearAllStorage } = useSettings();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 border-white/40 shadow-2xl z-10 overflow-hidden backdrop-blur-2xl text-slate-800 dark:text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/20 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">System Settings</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full glass-card hover:bg-white/40 dark:hover:bg-slate-800 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Options List */}
          <div className="py-6 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
            {/* Temperature Unit */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 rounded-xl bg-blue-500/20 text-blue-500">
                  <FiThermometer className="w-5 h-5" />
                </span>
                <div>
                  <span className="font-bold text-sm block">Temperature Unit</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Select metric or imperial units</span>
                </div>
              </div>
              <div className="flex rounded-2xl glass-card p-1">
                <button
                  onClick={() => updateSetting('tempUnit', 'celsius')}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    tempUnit === 'celsius' ? 'bg-blue-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:text-blue-500'
                  }`}
                >
                  {tempUnit === 'celsius' && <FiCheck className="w-3.5 h-3.5" />}
                  <span>Celsius (°C)</span>
                </button>
                <button
                  onClick={() => updateSetting('tempUnit', 'fahrenheit')}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    tempUnit === 'fahrenheit' ? 'bg-blue-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:text-blue-500'
                  }`}
                >
                  {tempUnit === 'fahrenheit' && <FiCheck className="w-3.5 h-3.5" />}
                  <span>Fahrenheit (°F)</span>
                </button>
              </div>
            </div>

            {/* Wind Speed Unit */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 rounded-xl bg-teal-500/20 text-teal-500">
                  <FiWind className="w-5 h-5" />
                </span>
                <div>
                  <span className="font-bold text-sm block">Wind Speed Unit</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Kilometers per hour vs miles per hour</span>
                </div>
              </div>
              <div className="flex rounded-2xl glass-card p-1">
                <button
                  onClick={() => updateSetting('windUnit', 'kmh')}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    windUnit === 'kmh' ? 'bg-teal-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:text-teal-500'
                  }`}
                >
                  {windUnit === 'kmh' && <FiCheck className="w-3.5 h-3.5" />}
                  <span>km/h</span>
                </button>
                <button
                  onClick={() => updateSetting('windUnit', 'mph')}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    windUnit === 'mph' ? 'bg-teal-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:text-teal-500'
                  }`}
                >
                  {windUnit === 'mph' && <FiCheck className="w-3.5 h-3.5" />}
                  <span>mph</span>
                </button>
              </div>
            </div>

            {/* Time Format */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 rounded-xl bg-purple-500/20 text-purple-500">
                  <FiClock className="w-5 h-5" />
                </span>
                <div>
                  <span className="font-bold text-sm block">Time Format</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">12-hour AM/PM or 24-hour clock</span>
                </div>
              </div>
              <div className="flex rounded-2xl glass-card p-1">
                <button
                  onClick={() => updateSetting('timeFormat', '12h')}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    timeFormat === '12h' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:text-purple-500'
                  }`}
                >
                  {timeFormat === '12h' && <FiCheck className="w-3.5 h-3.5" />}
                  <span>12 Hour (AM/PM)</span>
                </button>
                <button
                  onClick={() => updateSetting('timeFormat', '24h')}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    timeFormat === '24h' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:text-purple-500'
                  }`}
                >
                  {timeFormat === '24h' && <FiCheck className="w-3.5 h-3.5" />}
                  <span>24 Hour</span>
                </button>
              </div>
            </div>

            {/* Theme Preference */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-500">
                  <FiMonitor className="w-5 h-5" />
                </span>
                <div>
                  <span className="font-bold text-sm block">Appearance Theme</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Dark mode, light mode, or system sync</span>
                </div>
              </div>
              <div className="flex rounded-2xl glass-card p-1">
                {['dark', 'light', 'system'].map((t) => (
                  <button
                    key={t}
                    onClick={() => updateSetting('theme', t)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      theme === t ? 'bg-amber-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
                    }`}
                  >
                    {theme === t && <FiCheck className="w-3 h-3" />}
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Storage & Reset */}
            <div className="border-t border-white/10 pt-4">
              <button
                onClick={clearAllStorage}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-bold text-xs sm:text-sm transition-all duration-300 border border-rose-500/30"
              >
                <FiTrash2 className="w-4 h-4" />
                <span>Clear All Local Storage & Reset Preferences</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
