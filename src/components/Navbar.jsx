import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { Clock } from './Clock';
import { ThemeSwitcher } from './ThemeSwitcher';
import { FiCloudRain, FiSearch, FiSettings, FiGrid, FiHeart, FiInfo, FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const Navbar = ({ onOpenSearch, onOpenSettings }) => {
  const { tempUnit, updateSetting } = useSettings();

  const toggleTempUnit = () => {
    updateSetting('tempUnit', tempUnit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/20 dark:border-white/10 shadow-lg backdrop-blur-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
            <FiCloudRain className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              SkyPulse
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400 -mt-1">
              Weather OS
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 glass-pill px-2 py-1 border-white/25 dark:border-white/10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-white hover:bg-white/30 dark:hover:bg-slate-800/40'
              }`
            }
          >
            <FiHome className="w-3.5 h-3.5" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/forecast"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-white hover:bg-white/30 dark:hover:bg-slate-800/40'
              }`
            }
          >
            <FiGrid className="w-3.5 h-3.5" />
            <span>Forecast & Charts</span>
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-white hover:bg-white/30 dark:hover:bg-slate-800/40'
              }`
            }
          >
            <FiHeart className="w-3.5 h-3.5" />
            <span>Favorites</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-white hover:bg-white/30 dark:hover:bg-slate-800/40'
              }`
            }
          >
            <FiInfo className="w-3.5 h-3.5" />
            <span>About</span>
          </NavLink>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center space-x-2.5">
          {/* Quick Search Shortcut Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-2 glass-pill px-3 py-1.5 border-white/30 dark:border-white/15 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 text-slate-700 dark:text-slate-200 group"
            title="Search City (Ctrl+K)"
          >
            <FiSearch className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/40 dark:bg-slate-800 rounded border border-white/20 dark:border-slate-700 text-slate-500 dark:text-slate-400">
              Ctrl+K
            </kbd>
          </button>

          {/* Live Clock */}
          <Clock />

          {/* Temperature Unit Pill Switcher */}
          <button
            onClick={toggleTempUnit}
            title={`Switch to ${tempUnit === 'celsius' ? 'Fahrenheit (°F)' : 'Celsius (°C)'}`}
            className="glass-pill px-2.5 py-1.5 font-bold text-xs bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 border-white/30 dark:border-white/15 hover:bg-blue-500/30 transition-all duration-300 text-blue-600 dark:text-blue-300 w-12 text-center"
          >
            {tempUnit === 'celsius' ? '°C' : '°F'}
          </button>

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Settings Modal Trigger */}
          <button
            onClick={onOpenSettings}
            title="Open Settings"
            className="p-2 rounded-full glass-card hover:bg-white/40 dark:hover:bg-slate-800/80 transition-all duration-300 text-slate-700 dark:text-slate-200"
          >
            <FiSettings className="w-4 h-4 hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/20 dark:border-white/10 px-4 py-2 flex justify-around items-center backdrop-blur-2xl shadow-2xl">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-[10px] font-semibold ${
              isActive ? 'text-blue-500 dark:text-blue-400 scale-105 font-bold' : 'text-slate-600 dark:text-slate-400'
            }`
          }
        >
          <FiHome className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/forecast"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-[10px] font-semibold ${
              isActive ? 'text-blue-500 dark:text-blue-400 scale-105 font-bold' : 'text-slate-600 dark:text-slate-400'
            }`
          }
        >
          <FiGrid className="w-5 h-5 mb-0.5" />
          <span>Charts</span>
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-[10px] font-semibold ${
              isActive ? 'text-blue-500 dark:text-blue-400 scale-105 font-bold' : 'text-slate-600 dark:text-slate-400'
            }`
          }
        >
          <FiHeart className="w-5 h-5 mb-0.5" />
          <span>Favorites</span>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-[10px] font-semibold ${
              isActive ? 'text-blue-500 dark:text-blue-400 scale-105 font-bold' : 'text-slate-600 dark:text-slate-400'
            }`
          }
        >
          <FiInfo className="w-5 h-5 mb-0.5" />
          <span>About</span>
        </NavLink>
      </div>
    </header>
  );
};
