import React, { useState, useEffect } from 'react';
import { FiHeart, FiGithub, FiExternalLink, FiZap, FiCommand, FiCheckCircle } from 'react-icons/fi';

const WEATHER_FACTS_AND_TIPS = [
  "💡 Tip: High UV levels occur even on cloudy or overcast days—always wear SPF 30+ when outdoors!",
  "⛈️ Fact: A single bolt of lightning is around 5 times hotter than the surface of the sun!",
  "🌬️ Tip: Relative humidity between 30% and 60% is optimal for indoor breathing and comfort.",
  "❄️ Fact: No two snowflakes are identical; each crystalline structure is unique to its atmospheric descent.",
  "🌈 Tip: Rainbows always appear directly opposite the sun after a rain shower breaks up.",
  "🌡️ Fact: The highest natural temperature ever recorded on Earth was 56.7°C (134°F) in Death Valley.",
  "🌧️ Tip: Sudden drops in barometric pressure almost always signal approaching storms or precipitation."
];

export const Footer = () => {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % WEATHER_FACTS_AND_TIPS.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const nextFact = () => {
    setFactIndex((prev) => (prev + 1) % WEATHER_FACTS_AND_TIPS.length);
  };

  return (
    <footer className="w-full glass-panel border-t border-white/20 dark:border-white/10 py-8 px-4 sm:px-6 lg:px-8 mt-auto backdrop-blur-xl pb-24 md:pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col space-y-6">
        {/* Interactive Weather Tip Banner */}
        <div
          onClick={nextFact}
          className="cursor-pointer group glass-card p-3 rounded-2xl border-white/25 dark:border-white/10 hover:border-blue-400/50 flex items-center justify-between space-x-3 transition-all duration-300"
          title="Click for next weather tip or fact!"
        >
          <div className="flex items-center space-x-3 overflow-hidden">
            <span className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-sm shrink-0">
              <FiZap className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
            </span>

            <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 truncate sm:whitespace-normal">
              {WEATHER_FACTS_AND_TIPS[factIndex]}
            </p>
          </div>
          <span className="text-[10px] font-bold text-blue-500 group-hover:underline shrink-0 pl-2">
            Next Tip →
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
          {/* Brand & Attribution */}
          <div>
            <h3 className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
              SkyPulse Weather Application
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Frontend-only architecture powered by Open-Meteo & BigDataCloud APIs without API keys.
            </p>
          </div>

          {/* Keyboard Shortcuts Guide */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center space-x-1 glass-pill px-2.5 py-1 text-[11px] text-slate-600 dark:text-slate-300">
              <FiCommand className="w-3 h-3 text-blue-500" />
              <span>Search: <kbd className="font-mono font-bold">Ctrl+K</kbd></span>
            </span>
            <span className="inline-flex items-center space-x-1 glass-pill px-2.5 py-1 text-[11px] text-slate-600 dark:text-slate-300">
              <span>Close Modal: <kbd className="font-mono font-bold">ESC</kbd></span>
            </span>
          </div>

          {/* Links & Copyright */}
          <div className="flex flex-col md:items-end space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center justify-center md:justify-end space-x-4">
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 dark:hover:text-blue-400 flex items-center space-x-1 transition-colors"
              >
                <span>Open-Meteo API</span>
                <FiExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 dark:hover:text-blue-400 flex items-center space-x-1 transition-colors"
              >
                <FiGithub className="w-3.5 h-3.5" />
                <span>GitHub Pages</span>
              </a>
            </div>
            <p className="flex items-center justify-center md:justify-end space-x-1">
              <span>Crafted with</span>
              <FiHeart className="w-3 h-3 text-rose-500 fill-rose-500 inline mx-0.5" />
              <span>using React 19 + Vite + Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
