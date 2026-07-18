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

  // Ultra-Dark Obsidian & Midnight Space color gradients across all weather conditions
  const getGradientClasses = () => {
    switch (weatherState) {
      case 'sunny':
        return 'bg-gradient-to-br from-[#040714] via-[#0b1329] to-[#111c44] text-white';
      case 'night':
        return 'bg-gradient-to-br from-[#02040a] via-[#070a14] to-[#0e1326] text-white';
      case 'cloudy':
        return 'bg-gradient-to-br from-[#070b14] via-[#101728] to-[#1e293b] text-white';
      case 'rain':
        return 'bg-gradient-to-br from-[#030712] via-[#081a29] to-[#0d1f33] text-white';
      case 'snow':
        return 'bg-gradient-to-br from-[#080d1a] via-[#111827] to-[#1e293b] text-white';
      case 'storm':
        return 'bg-gradient-to-br from-[#020308] via-[#120524] to-[#080d1a] text-white';
      case 'fog':
        return 'bg-gradient-to-br from-[#080c14] via-[#111827] to-[#1f2937] text-white';
      default:
        return 'bg-gradient-to-br from-[#02040a] via-[#070a14] to-[#0e1326] text-white';
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
