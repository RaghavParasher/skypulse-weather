import React from 'react';

export const LightningEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Sudden sky flash */}
      <div className="absolute inset-0 bg-white/30 dark:bg-purple-300/20 animate-lightning mix-blend-overlay" />

      {/* Secondary distant bolt glow */}
      <div
        className="absolute top-[15%] right-[25%] w-[400px] h-[400px] bg-purple-400/30 rounded-full blur-[100px] animate-lightning"
        style={{ animationDelay: '3.5s' }}
      />
    </div>
  );
};
