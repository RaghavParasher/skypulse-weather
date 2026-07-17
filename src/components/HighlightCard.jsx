import React from 'react';
import { motion } from 'framer-motion';

export const HighlightCard = ({
  icon,
  title,
  value,
  subtext,
  badge,
  badgeColor = 'bg-blue-500/20 text-blue-300 border-blue-400/30',
  children,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.08 }}
      className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group border-white/30 dark:border-white/10 relative overflow-hidden shadow-lg backdrop-blur-xl"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
          <span className="p-2 rounded-xl bg-white/30 dark:bg-slate-800 shadow-sm shrink-0">
            {icon}
          </span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">{title}</span>
        </div>

        {badge && (
          <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="my-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {value}
        </h3>
      </div>

      {/* Custom visual children gauges (progress bar, compass, etc.) */}
      {children && <div className="my-3 w-full">{children}</div>}

      {/* Subtext description */}
      {subtext && (
        <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-2 border-t border-white/10 pt-2.5">
          {subtext}
        </p>
      )}
    </motion.div>
  );
};
