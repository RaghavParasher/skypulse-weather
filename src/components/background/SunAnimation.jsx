import React from 'react';

export const SunAnimation = () => {
  return (
    <div className="absolute top-12 right-12 md:top-24 md:right-32 w-48 h-48 pointer-events-none z-0">
      {/* Outer diffuse glow */}
      <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-3xl animate-pulse" />
      
      {/* Rotating sun rays */}
      <div className="absolute -inset-8 animate-sun-spin">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-72 h-2 -ml-36 -mt-1 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent rounded-full"
            style={{ transform: `rotate(${i * 45}deg)` }}
          />
        ))}
      </div>

      {/* Core sun orb */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 shadow-[0_0_80px_rgba(245,158,11,0.6)] animate-float" />

    </div>
  );
};
