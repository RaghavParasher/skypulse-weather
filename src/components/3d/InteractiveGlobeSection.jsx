import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Globe3D } from './Globe3D';
import { useWeather } from '../../context/WeatherContext';
import { FiGlobe, FiMaximize2, FiRotateCw, FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const InteractiveGlobeSection = () => {
  const { activeLocation, weatherData } = useWeather();
  const [globeDayMode, setGlobeDayMode] = useState(null); // null means auto-inherit from weather

  const isDay = globeDayMode !== null
    ? globeDayMode
    : weatherData?.current ? weatherData.current.is_day === 1 : true;

  const lat = activeLocation?.latitude ?? 40.71;
  const lon = activeLocation?.longitude ?? -74.01;
  const locName = activeLocation?.name ?? 'Global View';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full glass-panel rounded-[2.5rem] p-6 sm:p-8 border border-white/40 dark:border-white/20 backdrop-blur-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden group mb-8"
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/25 dark:border-white/15 pb-5 relative z-10">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-sky-400 via-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/40">
            <FiGlobe className="w-6 h-6 animate-spin" style={{ animationDuration: '18s' }} />
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase drop-shadow-sm">
                Interactive 3D Earth & Atmosphere
              </h2>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500/25 text-blue-300 border border-blue-400/40 shadow-sm animate-pulse">
                Spatial 3D Engine
              </span>
            </div>
            <p className="text-xs font-extrabold text-slate-600 dark:text-slate-300 mt-0.5">
              🖱️ Drag to rotate Earth • 🔍 Scroll to zoom • Centered on <span className="text-blue-500 dark:text-blue-400 font-black">{locName} ({lat.toFixed(2)}°, {lon.toFixed(2)}°)</span>
            </p>
          </div>
        </div>

        {/* Action Controls for Globe */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setGlobeDayMode(prev => (prev === null ? !isDay : !prev))}
            title="Toggle Day/Night Holographic Globe Lighting"
            className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-white/25 dark:bg-slate-900/60 border border-white/40 dark:border-white/20 text-xs font-bold hover:bg-white/45 dark:hover:bg-slate-800 transition-all text-slate-800 dark:text-slate-100 shadow-md hover:scale-105"
          >
            {isDay ? <FiSun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} /> : <FiMoon className="w-4 h-4 text-sky-400" />}
            <span>{isDay ? 'Day Mode' : 'Night Mode'}</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden relative my-3 bg-gradient-to-b from-[#090d16] via-[#1e1b4b] to-[#0284c7]/50 border border-blue-400/40 shadow-[inset_0_0_60px_rgba(56,189,248,0.3)]">
        {/* Ambient starry backdrop dots inside the 3D frame */}
        <div className="absolute inset-0 bg-[radial-gradient(#7dd3fc_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-35 pointer-events-none" />

        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 48 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Globe3D
            latitude={lat}
            longitude={lon}
            locationName={locName}
            isDay={isDay}
          />
        </Canvas>

        {/* Floating Spatial Label overlay at bottom of canvas */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
          <div className="glass-pill px-3.5 py-1.5 text-[11px] font-black bg-slate-900/80 border-white/20 text-slate-300 shadow-lg">
            📡 Live Coordinates: <span className="text-white font-mono">{lat.toFixed(4)}°N, {lon.toFixed(4)}°W</span>
          </div>
          <div className="glass-pill px-3.5 py-1.5 text-[11px] font-black bg-slate-900/80 border-white/20 text-blue-400 shadow-lg hidden sm:block">
            ✨ Powered by Three.js & WebGL GPU Acceleration
          </div>
        </div>
      </div>
    </motion.div>
  );
};
