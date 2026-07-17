import React, { useState } from 'react';
import { FiInfo, FiZap, FiCheckCircle, FiShield, FiCpu, FiLayout } from 'react-icons/fi';
import { motion } from 'framer-motion';

const WEATHER_TIPS = [
  "💡 Tip: High UV levels occur even on cloudy or overcast days—always wear SPF 30+ when outdoors!",
  "⛈️ Fact: A single bolt of lightning is around 5 times hotter than the surface of the sun!",
  "🌬️ Tip: Relative humidity between 30% and 60% is optimal for indoor breathing and comfort.",
  "❄️ Fact: No two snowflakes are identical; each crystalline structure is unique to its atmospheric descent.",
  "🌈 Tip: Rainbows always appear directly opposite the sun after a rain shower breaks up.",
  "🌡️ Fact: The highest natural temperature ever recorded on Earth was 56.7°C (134°F) in Death Valley.",
  "🌧️ Tip: Sudden drops in barometric pressure almost always signal approaching storms or precipitation."
];

export const About = () => {
  const [tipIndex, setTipIndex] = useState(0);

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % WEATHER_TIPS.length);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 flex-1 pb-16">
      {/* Hero Banner */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border-white/30 backdrop-blur-2xl shadow-2xl text-center relative overflow-hidden">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-sky-400 text-white mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
          <FiInfo className="w-8 h-8 animate-pulse" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          About SkyPulse Weather OS
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl mx-auto leading-relaxed font-medium">
          A state-of-the-art, frontend-only weather forecast application inspired by Apple Weather aesthetics and Windows 11 Mica glassmorphism.
        </p>

        {/* Interactive Random Tip Card */}
        <div
          onClick={nextTip}
          className="mt-8 cursor-pointer group glass-card p-4 sm:p-5 rounded-2xl border-blue-400/30 hover:border-blue-400 max-w-xl mx-auto transition-all duration-300 shadow-md text-left flex items-center justify-between space-x-4"
        >
          <div className="flex items-center space-x-3">
            <span className="p-2.5 rounded-xl bg-amber-500 text-white shadow-sm shrink-0">
              <FiZap className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
              {WEATHER_TIPS[tipIndex]}
            </p>
          </div>
          <span className="text-[11px] font-extrabold text-blue-500 group-hover:underline shrink-0 pl-2">
            Click for Next →
          </span>
        </div>
      </div>

      {/* Tech Stack Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-3xl p-6 border-white/30 shadow-xl space-y-3 backdrop-blur-xl">
          <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-500 w-fit">
            <FiCpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">100% Client-Side Engine</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            No Node.js backend, database, or server dependencies. Operates directly in your browser using React 19 + Vite and deploys seamlessly to GitHub Pages.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 border-white/30 shadow-xl space-y-3 backdrop-blur-xl">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-500 w-fit">
            <FiLayout className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Dynamic Glassmorphism</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Custom Framer Motion animations and CSS keyframes generate real-time atmospheric backgrounds (rain streaks, snow particles, drifting clouds, lightning, and stars).
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 border-white/30 shadow-xl space-y-3 backdrop-blur-xl">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-500 w-fit">
            <FiShield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Free Open APIs</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Integrates the completely free, no-API-key Open-Meteo Weather & Geocoding endpoints and BigDataCloud reverse geocoding.
          </p>
        </div>
      </div>

      {/* Feature Checklist */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border-white/30 backdrop-blur-2xl shadow-xl">
        <h2 className="text-lg font-extrabold tracking-tight uppercase text-slate-900 dark:text-white mb-4">
          Core Feature Highlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          {[
            'Live Air Quality (`US AQI`, PM2.5, PM10) with health advice',
            'Interactive Recharts curves (Temp, Humidity, Wind, Rain)',
            '24-Hour horizontal timeline & 7-Day Apple Weather bars',
            'LocalStorage persistence for Favorites, units & recent searches',
            'Progressive Web App (PWA) offline capability & manifest',
            'Global keyboard shortcut (`Ctrl+K`) for lightning-fast search',
            'Professional PDF report download using jsPDF & html2canvas',
            'Web Share API & clipboard summary generator'
          ].map((feat, i) => (
            <div key={i} className="flex items-center space-x-2.5 p-2 rounded-xl glass-card">
              <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
