import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Hero Card Skeleton */}
      <div className="w-full h-72 rounded-3xl bg-white/20 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="h-8 w-48 bg-white/30 dark:bg-slate-700 rounded-xl" />
            <div className="h-4 w-32 bg-white/20 dark:bg-slate-700/60 rounded-lg" />
          </div>
          <div className="h-8 w-24 bg-white/30 dark:bg-slate-700 rounded-full" />
        </div>

        <div className="flex items-center space-x-8">
          <div className="h-24 w-24 rounded-full bg-white/30 dark:bg-slate-700" />
          <div className="space-y-3">
            <div className="h-16 w-40 bg-white/30 dark:bg-slate-700 rounded-2xl" />
            <div className="h-6 w-28 bg-white/20 dark:bg-slate-700/60 rounded-full" />
          </div>
        </div>
      </div>

      {/* Highlights Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-44 rounded-3xl bg-white/20 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 p-5 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="h-6 w-24 bg-white/30 dark:bg-slate-700 rounded-lg" />
              <div className="h-6 w-6 rounded-full bg-white/30 dark:bg-slate-700" />
            </div>
            <div className="h-10 w-28 bg-white/30 dark:bg-slate-700 rounded-xl my-2" />
            <div className="h-3 w-36 bg-white/20 dark:bg-slate-700/60 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
