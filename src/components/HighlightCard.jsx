import React from 'react';
import { motion } from 'framer-motion';

export const HighlightCard = ({
  icon,
  title,
  value,
  subtext,
  badge,
  badgeColor = 'bg-blue-500/25 text-blue-300 border-blue-400/40',
  children,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-[2rem] p-6 flex flex-col justify-between hover:scale-[1.03] hover:-translate-y-1.5 transition-all duration-300 group border border-white/40 dark:border-white/15 relative overflow-hidden shadow-xl backdrop-blur-2xl bg-white/35 dark:bg-slate-900/60"
    >
      {/* Subtle top inner light highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5 text-white group-hover:text-sky-300 transition-colors">
          <span className="p-2.5 rounded-2xl bg-white/40 dark:bg-slate-800/80 border border-white/40 dark:border-white/15 shadow-md shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            {icon}
          </span>
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white drop-shadow">{title}</span>
        </div>

        {badge && (
          <span className={`text-[10px] sm:text-xs font-black px-3 py-1 rounded-full border shadow-sm ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="my-2">
        <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">
          {value}
        </h3>
      </div>

      {/* Custom visual children gauges (progress bar, compass, etc.) */}
      {children && <div className="my-3.5 w-full">{children}</div>}

      {/* Subtext description */}
      {subtext && (
        <p className="text-xs sm:text-sm font-bold text-slate-200 mt-3 border-t border-white/20 pt-3 leading-relaxed">
          {subtext}
        </p>
      )}
    </motion.div>
  );
};
