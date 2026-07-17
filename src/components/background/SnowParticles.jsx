import React, { useMemo } from 'react';

export const SnowParticles = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 5 + 6}s`,
      size: `${Math.random() * 6 + 4}px`,
      opacity: Math.random() * 0.7 + 0.3
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-0 rounded-full bg-white shadow-[0_0_8px_#ffffff]"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animation: `snow-fall ${flake.duration} ease-in-out infinite ${flake.delay}`
          }}
        />
      ))}
    </div>
  );
};
