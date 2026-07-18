import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { SunAnimation } from './SunAnimation';
import { MoonAnimation } from './MoonAnimation';
import { StarsAnimation } from './StarsAnimation';
import { MovingClouds } from './MovingClouds';
import { RainAnimation } from './RainAnimation';
import { SnowParticles } from './SnowParticles';
import { LightningEffect } from './LightningEffect';
import { AtmosphericBackground3D } from '../3d/AtmosphericBackground3D';

export const WeatherBackground = ({ children }) => {
  const { weatherState } = useWeather();

  // Vibrant macOS Sonoma & Aurora Cyber-Glass color gradients
  const getGradientClasses = () => {
    switch (weatherState) {
      case 'sunny':
        return 'bg-gradient-to-br from-[#0284c7] via-[#2563eb] to-[#4f46e5] dark:from-[#0c4a6e] dark:via-[#1e3a8a] dark:to-[#311042] text-white';
      case 'night':
        return 'bg-gradient-to-br from-[#090d16] via-[#1e1b4b] to-[#311042] text-white';
      case 'cloudy':
        return 'bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#3b82f6] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#312e81] text-white';
      case 'rain':
        return 'bg-gradient-to-br from-[#0f172a] via-[#164e63] to-[#1e3a8a] dark:from-[#082f49] dark:via-[#0c4a6e] dark:to-[#172554] text-white';
      case 'snow':
        return 'bg-gradient-to-br from-[#38bdf8] via-[#60a5fa] to-[#818cf8] dark:from-[#0f172a] dark:via-[#1e3a8a] dark:to-[#312e81] text-white';
      case 'storm':
        return 'bg-gradient-to-br from-[#180828] via-[#3b0764] to-[#090d16] dark:from-[#0c0414] dark:via-[#2e1065] dark:to-[#0f172a] text-white';
      case 'fog':
        return 'bg-gradient-to-br from-[#334155] via-[#475569] to-[#64748b] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155] text-white';
      default:
        return 'bg-gradient-to-br from-[#090d16] via-[#1e1b4b] to-[#311042] text-white';
    }
  };

  return (
    <div className={`min-h-screen w-full relative transition-all duration-1000 overflow-x-hidden ${getGradientClasses()}`}>
      {/* Animated Floating Aurora Mesh Spotlights behind glass */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-left golden/cyan aurora */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-sky-400/30 via-blue-500/25 to-indigo-500/20 blur-[130px] animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
        
        {/* Bottom-right violet/magenta aurora */}
        <div className="absolute -bottom-40 -right-40 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-purple-600/25 via-pink-500/20 to-blue-600/20 blur-[140px] animate-pulse pointer-events-none" style={{ animationDuration: '12s' }} />
        
        {/* Center ambient glow blob */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-cyan-400/15 to-blue-600/15 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

        {/* GPU 3D Atmospheric Particle System */}
        <AtmosphericBackground3D />

        {weatherState === 'sunny' && (
          <>
            <SunAnimation />
            <MovingClouds intensity="light" />
          </>
        )}

        {weatherState === 'night' && (
          <>
            <StarsAnimation />
            <MoonAnimation />
            <MovingClouds intensity="light" />
          </>
        )}

        {weatherState === 'cloudy' && (
          <MovingClouds intensity="heavy" />
        )}

        {weatherState === 'rain' && (
          <>
            <MovingClouds intensity="heavy" />
            <RainAnimation isHeavy={false} />
          </>
        )}

        {weatherState === 'snow' && (
          <>
            <MovingClouds intensity="normal" />
            <SnowParticles />
          </>
        )}

        {weatherState === 'storm' && (
          <>
            <MovingClouds intensity="heavy" />
            <RainAnimation isHeavy={true} />
            <LightningEffect />
          </>
        )}

        {weatherState === 'fog' && (
          <>
            <MovingClouds intensity="heavy" />
            <div className="absolute inset-0 bg-white/20 dark:bg-black/40 backdrop-blur-3xl animate-pulse" />
          </>
        )}

        {/* Ambient colored lighting overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Main Application Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};
