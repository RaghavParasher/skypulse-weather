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
    <div className="sticky top-4 z-40 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-500">
      <header className="w-full rounded-3xl glass-panel border border-white/40 dark:border-white/20 shadow-2xl backdrop-blur-3xl px-4 sm:px-6 py-3 transition-all duration-500">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center space-x-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <FiCloudRain className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-500 via-indigo-400 to-sky-300 bg-clip-text text-transparent drop-shadow-sm">
                SkyPulse
              </span>
              <span className="block text-[10px] uppercase font-extrabold tracking-widest text-slate-500 dark:text-slate-400 -mt-1 group-hover:text-blue-400 transition-colors">
                Weather OS
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1.5 p-1.5 rounded-full bg-white/15 backdrop-blur-2xl border border-white/30 shadow-inner">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'text-slate-200 hover:text-white hover:bg-white/20'
                }`
              }
            >
              <FiHome className="w-4 h-4" />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/forecast"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'text-slate-200 hover:text-white hover:bg-white/20'
                }`
              }
            >
              <FiGrid className="w-4 h-4" />
              <span>Forecast & Charts</span>
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'text-slate-200 hover:text-white hover:bg-white/20'
                }`
              }
            >
              <FiHeart className="w-4 h-4" />
              <span>Favorites</span>
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'text-slate-200 hover:text-white hover:bg-white/20'
                }`
              }
            >
              <FiInfo className="w-4 h-4" />
              <span>About</span>
            </NavLink>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-3">
            {/* Quick Search Shortcut Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-white/15 border border-white/30 hover:border-sky-400 transition-all duration-300 text-white shadow-md group hover:scale-105"
              title="Search City (Ctrl+K)"
            >
              <FiSearch className="w-4 h-4 text-sky-300 group-hover:scale-125 transition-transform" />
              <span className="text-xs font-bold hidden sm:inline text-white">Search</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/20 rounded border border-white/30 text-slate-100 font-bold">
                Ctrl+K
              </kbd>
            </button>

            {/* Live Clock */}
            <div className="hidden sm:block">
              <Clock />
            </div>

            {/* Temperature Unit Pill Switcher */}
            <button
              onClick={toggleTempUnit}
              title={`Switch to ${tempUnit === 'celsius' ? 'Fahrenheit (°F)' : 'Celsius (°C)'}`}
              className="px-3 py-2 rounded-2xl font-black text-xs bg-gradient-to-tr from-blue-500/30 via-indigo-500/30 to-sky-500/30 border border-blue-400/40 hover:bg-blue-500/40 transition-all duration-300 text-sky-200 w-12 text-center shadow-md hover:scale-105"
            >
              {tempUnit === 'celsius' ? '°C' : '°F'}
            </button>

            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Settings Modal Trigger */}
            <button
              onClick={onOpenSettings}
              title="Open Settings"
              className="p-2.5 rounded-2xl bg-white/15 border border-white/30 hover:bg-white/30 transition-all duration-300 text-white shadow-md hover:scale-105"
            >
              <FiSettings className="w-4 h-4 hover:rotate-90 transition-transform duration-500 text-sky-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 rounded-3xl glass-panel border border-white/40 px-5 py-3 flex justify-around items-center backdrop-blur-3xl shadow-2xl">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-[11px] font-bold transition-all duration-300 ${
              isActive ? 'text-sky-300 scale-110' : 'text-slate-300 hover:text-white'
            }`
          }
        >
          <FiHome className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/forecast"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-[11px] font-bold transition-all duration-300 ${
              isActive ? 'text-sky-300 scale-110' : 'text-slate-300 hover:text-white'
            }`
          }
        >
          <FiGrid className="w-5 h-5 mb-0.5" />
          <span>Charts</span>
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-[11px] font-bold transition-all duration-300 ${
              isActive ? 'text-sky-300 scale-110' : 'text-slate-300 hover:text-white'
            }`
          }
        >
          <FiHeart className="w-5 h-5 mb-0.5" />
          <span>Favorites</span>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-[11px] font-bold transition-all duration-300 ${
              isActive ? 'text-sky-300 scale-110' : 'text-slate-300 hover:text-white'
            }`
          }
        >
          <FiInfo className="w-5 h-5 mb-0.5" />
          <span>About</span>
        </NavLink>
      </div>
    </div>
  );
};
