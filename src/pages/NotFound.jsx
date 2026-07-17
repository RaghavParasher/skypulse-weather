import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiCloudOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const NotFound = () => {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto my-20 px-4 sm:px-6 w-full text-center flex-1 flex flex-col items-center justify-center space-y-6"
    >
      <div className="p-6 rounded-3xl glass-panel border-white/30 shadow-2xl backdrop-blur-2xl">
        <FiCloudOff className="w-24 h-24 text-blue-500 animate-pulse mx-auto drop-shadow-lg" />
      </div>

      <div>
        <h1 className="text-6xl font-black tracking-tighter text-slate-900 dark:text-white">404</h1>
        <h2 className="text-2xl font-extrabold tracking-tight mt-2 text-slate-800 dark:text-slate-100">
          Lost in the Clouds & Fog
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
          The weather forecast page you are looking for does not exist or has drifted away like mist. Let's get you back to safe skies!
        </p>
      </div>

      <NavLink
        to="/"
        className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 transition-all active:scale-95"
      >
        <FiHome className="w-4 h-4" />
        <span>Return to Home Forecast</span>
      </NavLink>
    </motion.main>
  );
};
