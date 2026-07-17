import React from 'react';

export const MoonAnimation = () => {
  return (
    <div className="absolute top-16 right-16 md:top-28 md:right-36 w-40 h-40 pointer-events-none z-0 animate-float-slow">
      {/* Outer lunar halo */}
      <div className="absolute -inset-12 rounded-full bg-blue-300/10 blur-3xl animate-pulse" />

      {/* Moon Orb */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-slate-200 via-indigo-100 to-white shadow-[0_0_60px_rgba(226,232,240,0.5)] overflow-hidden">
        {/* Subtle lunar craters */}
        <div className="absolute top-6 left-8 w-8 h-8 rounded-full bg-slate-300/40 blur-[1px]" />
        <div className="absolute top-20 left-16 w-12 h-10 rounded-full bg-slate-300/30 blur-[2px]" />
        <div className="absolute bottom-8 right-10 w-6 h-6 rounded-full bg-slate-300/40 blur-[1px]" />
      </div>
    </div>
  );
};
