import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { FiNavigation, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const POPULAR_CITIES = [
  { id: 'Tokyo-35.689-139.692', name: 'Tokyo', country: 'Japan', admin1: 'Tokyo', latitude: 35.689, longitude: 139.692, timezone: 'Asia/Tokyo' },
  { id: 'London-51.508--0.126', name: 'London', country: 'United Kingdom', admin1: 'England', latitude: 51.508, longitude: -0.126, timezone: 'Europe/London' },
  { id: 'New York-40.714--74.006', name: 'New York', country: 'United States', admin1: 'New York', latitude: 40.714, longitude: -74.006, timezone: 'America/New_York' },
  { id: 'Paris-48.853-2.349', name: 'Paris', country: 'France', admin1: 'Île-de-France', latitude: 48.853, longitude: 2.349, timezone: 'Europe/Paris' },
  { id: 'Sydney--33.868-151.207', name: 'Sydney', country: 'Australia', admin1: 'New South Wales', latitude: -33.868, longitude: 151.207, timezone: 'Australia/Sydney' },
  { id: 'San Francisco-37.775--122.419', name: 'San Francisco', country: 'United States', admin1: 'California', latitude: 37.775, longitude: -122.419, timezone: 'America/Los_Angeles' },
];

export const InitialLocationModal = ({ isOpen, onOpenSearch }) => {
  const { selectLocation, triggerGeolocation, loadingGeo, dismissInitialModal } = useWeather();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-lg"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          className="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 border-white/40 shadow-2xl z-10 overflow-hidden backdrop-blur-2xl text-white text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30">
            <FiMapPin className="w-8 h-8 animate-bounce" style={{ animationDuration: '2s' }} />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow">Welcome to SkyPulse!</h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-md mx-auto leading-relaxed font-semibold">
              As per your preferences, you can choose your default city right now, use your device's GPS geolocation, or explore our curated popular cities.
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={triggerGeolocation}
              disabled={loadingGeo}
              className="flex-1 flex items-center justify-center space-x-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <FiNavigation className={`w-4 h-4 ${loadingGeo ? 'animate-spin' : ''}`} />
              <span>{loadingGeo ? 'Detecting GPS...' : 'Use Current GPS'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                dismissInitialModal();
                if (onOpenSearch) onOpenSearch();
              }}
              className="flex-1 flex items-center justify-center space-x-2 py-3.5 px-4 rounded-2xl bg-white/20 hover:bg-white/35 text-white font-extrabold text-sm border border-white/30 shadow transition-all cursor-pointer"
            >
              <span>Search Any City</span>
            </button>
          </div>

          {/* Popular Cities Grid */}
          <div className="pt-2 border-t border-white/20 text-left">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 text-center">
              Or Select a Popular World City
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              {POPULAR_CITIES.map((city) => (
                <button
                  type="button"
                  key={city.id}
                  onClick={() => selectLocation(city)}
                  className="flex items-center justify-between p-3 rounded-2xl glass-card hover:bg-white/25 border border-white/30 transition-all text-left group cursor-pointer shadow-sm"
                >
                  <div className="truncate pr-2">
                    <span className="font-bold text-sm block truncate text-white group-hover:text-sky-300 transition-colors">
                      {city.name}
                    </span>
                    <span className="text-xs text-slate-200 font-semibold block">
                      {city.country}
                    </span>
                  </div>
                  <FiCheckCircle className="w-4 h-4 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
