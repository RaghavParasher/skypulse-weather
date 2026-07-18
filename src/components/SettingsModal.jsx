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
          className="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 border-white/40 shadow-2xl z-10 overflow-hidden backdrop-blur-2xl text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/20">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow">System Settings</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/35 text-white transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Options List */}
          <div className="py-6 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
            {/* Temperature Unit */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 rounded-xl bg-blue-500/30 text-sky-300">
                  <FiThermometer className="w-5 h-5" />
                </span>
                <div>
                  <span className="font-bold text-sm block text-white">Temperature Unit</span>
                  <span className="text-xs text-slate-200">Select metric or imperial units</span>
                </div>
              </div>
              <div className="flex rounded-2xl bg-white/10 border border-white/20 p-1">
                <button
                  type="button"
                  onClick={() => updateSetting('tempUnit', 'celsius')}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tempUnit === 'celsius' ? 'bg-blue-500 text-white shadow-md' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {tempUnit === 'celsius' && <FiCheck className="w-3.5 h-3.5" />}
                  <span>Celsius (°C)</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateSetting('tempUnit', 'fahrenheit')}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tempUnit === 'fahrenheit' ? 'bg-blue-500 text-white shadow-md' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {tempUnit === 'fahrenheit' && <FiCheck className="w-3.5 h-3.5" />}
                  <span>Fahrenheit (°F)</span>
                </button>
              </div>
            </div>

            {/* Wind Speed Unit */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/20 pt-4">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 rounded-xl bg-teal-500/30 text-teal-300">
                  <FiWind className="w-5 h-5" />
                </span>
                <div>
                  <span className="font-bold text-sm block text-white">Wind Speed Unit</span>
                  <span className="text-xs text-slate-200">Kilometers per hour vs miles per hour</span>
                </div>
              </div>
              <div className="flex rounded-2xl bg-white/10 border border-white/20 p-1">
                <button
                  type="button"
                  onClick={() => updateSetting('windUnit', 'kmh')}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    windUnit === 'kmh' ? 'bg-teal-500 text-white shadow-md' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {windUnit === 'kmh' && <FiCheck className="w-3.5 h-3.5" />}
                  <span>km/h</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateSetting('windUnit', 'mph')}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    windUnit === 'mph' ? 'bg-teal-500 text-white shadow-md' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {windUnit === 'mph' && <FiCheck className="w-3.5 h-3.5" />}
                  <span>mph</span>
                </button>
              </div>
            </div>

            {/* Time Format */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/20 pt-4">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 rounded-xl bg-purple-500/30 text-purple-300">
                  <FiClock className="w-5 h-5" />
                </span>
                <div>
                  <span className="font-bold text-sm block text-white">Time Format</span>
                  <span className="text-xs text-slate-200">12-hour AM/PM or 24-hour clock</span>
                </div>
              </div>
              <div className="flex rounded-2xl bg-white/10 border border-white/20 p-1">
                <button
                  type="button"
                  onClick={() => updateSetting('timeFormat', '12h')}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    timeFormat === '12h' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {timeFormat === '12h' && <FiCheck className="w-3.5 h-3.5" />}
                  <span>12 Hour (AM/PM)</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateSetting('timeFormat', '24h')}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    timeFormat === '24h' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {timeFormat === '24h' && <FiCheck className="w-3.5 h-3.5" />}
                  <span>24 Hour</span>
                </button>
              </div>
            </div>

            {/* Theme Preference */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/20 pt-4">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 rounded-xl bg-amber-500/30 text-amber-300">
                  <FiMonitor className="w-5 h-5" />
                </span>
                <div>
                  <span className="font-bold text-sm block text-white">Appearance Theme</span>
                  <span className="text-xs text-slate-200">Dark mode, light mode, or system sync</span>
                </div>
              </div>
              <div className="flex rounded-2xl bg-white/10 border border-white/20 p-1">
                {['dark', 'light', 'system'].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => updateSetting('theme', t)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                      theme === t ? 'bg-amber-500 text-white shadow-md' : 'text-slate-200 hover:text-white'
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
