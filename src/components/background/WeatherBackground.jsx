import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { SunAnimation } from './SunAnimation';
import { MoonAnimation } from './MoonAnimation';
import { StarsAnimation } from './StarsAnimation';
import { MovingClouds } from './MovingClouds';
import { RainAnimation } from './RainAnimation';
import { SnowParticles } from './SnowParticles';
import { LightningEffect } from './LightningEffect';

export const WeatherBackground = ({ children }) => {
  const { weatherState } = useWeather();

  // Background color gradients according to weather state and day/night
  const getGradientClasses = () => {
    switch (weatherState) {
      case 'sunny':
        return 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700 dark:from-sky-900 dark:via-blue-950 dark:to-slate-950';
      case 'night':
        return 'bg-gradient-to-br from-slate-900 via-indigo-950 to-black';
      case 'cloudy':
        return 'bg-gradient-to-br from-slate-400 via-blue-400 to-slate-600 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950';
      case 'rain':
        return 'bg-gradient-to-br from-slate-600 via-teal-800 to-slate-900 dark:from-slate-900 dark:via-slate-950 dark:to-black';
      case 'snow':
        return 'bg-gradient-to-br from-indigo-200 via-sky-300 to-slate-400 dark:from-slate-800 dark:via-indigo-950 dark:to-slate-900';
      case 'storm':
        return 'bg-gradient-to-br from-slate-800 via-purple-950 to-black dark:from-slate-950 dark:via-purple-950 dark:to-black';
      case 'fog':
        return 'bg-gradient-to-br from-slate-300 via-gray-400 to-slate-500 dark:from-slate-800 dark:via-gray-900 dark:to-slate-950';
      default:
        return 'bg-gradient-to-br from-slate-900 via-indigo-950 to-black';
    }
  };

  return (
    <div className={`min-h-screen w-full relative transition-colors duration-1000 overflow-x-hidden ${getGradientClasses()}`}>
      {/* Background Animated Layers */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
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
