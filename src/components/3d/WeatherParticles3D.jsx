import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const WeatherParticles3D = ({ weatherType = 'clear', windSpeed = 10, count = 1200 }) => {
  const pointsRef = useRef();

  // Determine particle characteristics based on weather condition
  const isRain = weatherType === 'rain' || weatherType === 'thunderstorm' || weatherType === 'drizzle';
  const isSnow = weatherType === 'snow';
  const isClear = !isRain && !isSnow;

  const particleCount = isRain ? count : isSnow ? Math.floor(count * 0.8) : Math.floor(count * 0.6);

  // Generate random 3D positions, velocities, and scales
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Spread across a wide 3D bounding box around the camera/scene
      pos[i * 3] = (Math.random() - 0.5) * 24; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24; // Z

      if (isRain) {
        vel[i * 3] = (windSpeed / 100) + (Math.random() * 0.05); // X wind deflection
        vel[i * 3 + 1] = -(0.3 + Math.random() * 0.25); // Fast Y downward velocity
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02; // Z drift
      } else if (isSnow) {
        vel[i * 3] = (windSpeed / 200) + (Math.random() - 0.5) * 0.03; // Gentle X drift
        vel[i * 3 + 1] = -(0.04 + Math.random() * 0.04); // Slow Y downward velocity
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.03; // Gentle Z swirl
      } else {
        // Clear sky floating stardust / ambient particles
        vel[i * 3] = (Math.random() - 0.5) * 0.008;
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
      }
    }

    return [pos, vel];
  }, [particleCount, isRain, isSnow, windSpeed]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArr = posAttr.array;

    const time = state.clock.getElapsedTime();

    for (let i = 0; i < particleCount; i++) {
      let x = posArr[i * 3];
      let y = posArr[i * 3 + 1];
      let z = posArr[i * 3 + 2];

      const vx = velocities[i * 3];
      const vy = velocities[i * 3 + 1];
      const vz = velocities[i * 3 + 2];

      if (isRain) {
        x += vx * (delta * 60);
        y += vy * (delta * 60);
        z += vz * (delta * 60);
      } else if (isSnow) {
        // Add sinusoidal turbulence for realistic snow swirl
        x += (vx + Math.sin(time * 2 + i) * 0.015) * (delta * 60);
        y += vy * (delta * 60);
        z += (vz + Math.cos(time * 2 + i) * 0.015) * (delta * 60);
      } else {
        // Gentle organic floating motion for ambient clear/star particles
        x += Math.sin(time + i) * 0.004;
        y += Math.cos(time + i) * 0.004;
        z += Math.sin(time * 0.5 + i) * 0.004;
      }

      // Boundary wrap-around so particles loop infinitely inside the 3D room
      if (y < -10) y = 10;
      if (y > 10) y = -10;
      if (x < -12) x = 12;
      if (x > 12) x = -12;
      if (z < -12) z = 12;
      if (z > 12) z = -12;

      posArr[i * 3] = x;
      posArr[i * 3 + 1] = y;
      posArr[i * 3 + 2] = z;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isRain ? 0.07 : isSnow ? 0.12 : 0.06}
        color={isRain ? '#93c5fd' : isSnow ? '#ffffff' : '#38bdf8'}
        transparent={true}
        opacity={isRain ? 0.75 : isSnow ? 0.85 : 0.45}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
