import React, { useMemo } from 'react';

export const RainAnimation = ({ isHeavy = false }) => {
  const drops = useMemo(() => {
    const count = isHeavy ? 60 : 35;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 110 - 5}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${Math.random() * 0.4 + 0.4}s`,
      height: `${Math.random() * 35 + 20}px`,
      opacity: Math.random() * 0.5 + 0.3
    }));
  }, [isHeavy]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute top-0 w-[2px] bg-gradient-to-b from-transparent via-blue-300/80 to-blue-200"
          style={{
            left: drop.left,
            height: drop.height,
            opacity: drop.opacity,
            animation: `rain-fall ${drop.duration} linear infinite ${drop.delay}`
          }}
        />
      ))}
    </div>
  );
};
