import React from 'react';

export const MovingClouds = ({ intensity = 'normal' }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-85 dark:opacity-60">
      {/* Cloud layer 1 */}
      <div
        className="absolute top-[5%] -left-[20%] w-[60%] h-[350px] bg-white/30 dark:bg-slate-400/15 rounded-full blur-3xl animate-cloud-drift"
        style={{ animationDuration: '35s' }}
      />

      {/* Cloud layer 2 */}
      <div
        className="absolute top-[20%] -right-[15%] w-[55%] h-[300px] bg-slate-200/40 dark:bg-slate-300/10 rounded-full blur-3xl animate-cloud-drift"
        style={{ animationDuration: '45s', animationDelay: '-15s' }}
      />

      {/* Cloud layer 3 */}
      <div
        className="absolute top-[40%] left-[10%] w-[70%] h-[380px] bg-white/25 dark:bg-slate-500/15 rounded-full blur-3xl animate-cloud-drift"
        style={{ animationDuration: '55s', animationDelay: '-25s' }}
      />

      {intensity === 'heavy' && (
        <div
          className="absolute top-[10%] left-[30%] w-[65%] h-[400px] bg-slate-400/40 dark:bg-slate-700/30 rounded-full blur-3xl animate-cloud-drift"
          style={{ animationDuration: '28s', animationDelay: '-5s' }}
        />
      )}
    </div>
  );
};
