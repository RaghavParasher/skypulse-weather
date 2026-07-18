import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

export const ThemeSwitcher = () => {
  const { theme, updateSetting } = useSettings();

  const cycleTheme = () => {
    if (theme === 'dark') updateSetting('theme', 'light');
    else if (theme === 'light') updateSetting('theme', 'system');
    else updateSetting('theme', 'dark');
  };

  const getIcon = () => {
    if (theme === 'dark') return <FiMoon className="w-4 h-4 text-indigo-400" />;
    if (theme === 'light') return <FiSun className="w-4 h-4 text-amber-500" />;
    return <FiMonitor className="w-4 h-4 text-blue-400" />;
  };

  const getLabel = () => {
    if (theme === 'dark') return 'Dark';
    if (theme === 'light') return 'Light';
    return 'System';
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      title={`Current theme: ${getLabel()}. Click to switch.`}
      className="flex items-center space-x-2 glass-pill px-3 py-1.5 border-white/30 hover:bg-white/35 text-white font-bold transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -10, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 10, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
      <span className="text-xs font-black tracking-wide capitalize hidden sm:inline text-white">{getLabel()}</span>
    </button>
  );
};
