import React from 'react';
import {
  FiSun,
  FiMoon,
  FiCloud,
  FiCloudDrizzle,
  FiCloudRain,
  FiCloudSnow,
  FiCloudLightning,
  FiWind
} from 'react-icons/fi';

export const WeatherIcon = ({ iconCode = 'clear', size = 'md', animate = true }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6';
      case 'md':
        return 'w-10 h-10';
      case 'lg':
        return 'w-16 h-16';
      case 'xl':
        return 'w-24 h-24';
      case '2xl':
        return 'w-32 h-32';
      default:
        return 'w-10 h-10';
    }
  };

  const renderIcon = () => {
    switch (iconCode) {
      case 'clear':
        return (
          <div className="relative flex items-center justify-center">
            <FiSun className={`${getSizeClasses()} text-amber-400 ${animate ? 'animate-sun-spin' : ''} drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]`} style={{ animationDuration: '40s' }} />
          </div>
        );
      case 'night-clear':
        return (
          <div className="relative flex items-center justify-center">
            <FiMoon className={`${getSizeClasses()} text-indigo-200 ${animate ? 'animate-float' : ''} drop-shadow-[0_0_12px_rgba(199,210,254,0.6)]`} />
          </div>
        );
      case 'partly-cloudy':
        return (
          <div className="relative flex items-center justify-center">
            <FiSun className={`${size === 'xl' || size === '2xl' ? 'w-14 h-14 -mt-4 -mr-4' : 'w-6 h-6 -mt-1 -mr-1'} absolute text-amber-400 ${animate ? 'animate-sun-spin' : ''}`} style={{ animationDuration: '35s' }} />
            <FiCloud className={`${getSizeClasses()} text-slate-200 dark:text-slate-300 relative z-10 ${animate ? 'animate-float' : ''} drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]`} />
          </div>
        );
      case 'night-partly-cloudy':
        return (
          <div className="relative flex items-center justify-center">
            <FiMoon className={`${size === 'xl' || size === '2xl' ? 'w-12 h-12 -mt-4 -mr-4' : 'w-5 h-5 -mt-1 -mr-1'} absolute text-indigo-300 ${animate ? 'animate-float' : ''}`} />
            <FiCloud className={`${getSizeClasses()} text-slate-400 relative z-10 ${animate ? 'animate-float' : ''}`} />
          </div>
        );
      case 'cloudy':
        return (
          <div className="relative flex items-center justify-center">
            <FiCloud className={`${getSizeClasses()} text-slate-300 dark:text-slate-200 ${animate ? 'animate-float' : ''} drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]`} />
          </div>
        );
      case 'fog':
        return (
          <div className="relative flex items-center justify-center">
            <FiWind className={`${getSizeClasses()} text-slate-400 dark:text-slate-300 ${animate ? 'animate-pulse' : ''}`} />
          </div>
        );
      case 'drizzle':
        return (
          <div className="relative flex items-center justify-center">
            <FiCloudDrizzle className={`${getSizeClasses()} text-sky-400 ${animate ? 'animate-float' : ''} drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]`} />
          </div>
        );
      case 'rain':
      case 'showers':
        return (
          <div className="relative flex items-center justify-center">
            <FiCloudRain className={`${getSizeClasses()} text-blue-400 ${animate ? 'animate-float' : ''} drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]`} />
          </div>
        );
      case 'heavy-rain':
      case 'freezing-rain':
        return (
          <div className="relative flex items-center justify-center">
            <FiCloudRain className={`${getSizeClasses()} text-blue-500 animate-bounce drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]`} style={{ animationDuration: '2s' }} />
          </div>
        );
      case 'snow':
      case 'snow-showers':
      case 'heavy-snow':
        return (
          <div className="relative flex items-center justify-center">
            <FiCloudSnow className={`${getSizeClasses()} text-sky-200 ${animate ? 'animate-float' : ''} drop-shadow-[0_0_12px_rgba(186,230,253,0.7)]`} />
          </div>
        );
      case 'thunderstorm':
      case 'thunderstorm-hail':
        return (
          <div className="relative flex items-center justify-center">
            <FiCloudLightning className={`${getSizeClasses()} text-amber-300 ${animate ? 'animate-pulse' : ''} drop-shadow-[0_0_16px_rgba(252,211,77,0.8)]`} />
          </div>
        );
      default:
        return (
          <div className="relative flex items-center justify-center">
            <FiCloud className={`${getSizeClasses()} text-slate-400`} />
          </div>
        );
    }
  };

  return <div className="inline-flex items-center justify-center shrink-0">{renderIcon()}</div>;
};
