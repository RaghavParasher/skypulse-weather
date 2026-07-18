import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, Cone } from '@react-three/drei';
import * as THREE from 'three';

export const FloatingWeatherIcon3D = ({ weatherType = 'clear', isDay = true }) => {
  const groupRef = useRef();
  const ringRef = useRef();
  const cloudGroupRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle floating bobbing up and down + subtle tilt
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.15;
      groupRef.current.rotation.y += delta * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.6;
      ringRef.current.rotation.z += delta * 0.3;
    }
    if (cloudGroupRef.current) {
      cloudGroupRef.current.rotation.y -= delta * 0.2;
    }
  });

  const isRain = weatherType === 'rain' || weatherType === 'thunderstorm' || weatherType === 'drizzle';
  const isSnow = weatherType === 'snow';
  const isCloudy = weatherType === 'cloudy' || weatherType === 'overcast' || weatherType === 'fog';

  // 1. Clear Day / Night (Sun Sphere / Moon Orb)
  if (!isRain && !isSnow && !isCloudy) {
    return (
      <group ref={groupRef} scale={[1.1, 1.1, 1.1]}>
        <ambientLight intensity={1.5} />
        <pointLight position={[0, 0, 0]} intensity={3} color={isDay ? '#fbbf24' : '#60a5fa'} />

        {/* Central Glowing Orb (Sun or Moon) */}
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial
            color={isDay ? '#f59e0b' : '#38bdf8'}
            emissive={isDay ? '#fbbf24' : '#60a5fa'}
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </Sphere>

        {/* Outer Pulsing Coronal Ring */}
        <Torus ref={ringRef} args={[1.4, 0.08, 16, 64]} rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial
            color={isDay ? '#fbbf24' : '#93c5fd'}
            emissive={isDay ? '#f59e0b' : '#3b82f6'}
            emissiveIntensity={1.5}
            transparent={true}
            opacity={0.8}
          />
        </Torus>
      </group>
    );
  }

  // 2. Storm / Rain / Cloud 3D Sculpture
  if (isRain || isCloudy) {
    return (
      <group ref={groupRef} scale={[1, 1, 1]}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 2]} intensity={2} color="#ffffff" />

        {/* Cloud Cluster Group made of intersecting spheres */}
        <group ref={cloudGroupRef}>
          <Sphere position={[0, 0.2, 0]} args={[0.8, 32, 32]}>
            <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.2} />
          </Sphere>
          <Sphere position={[-0.6, 0, 0.2]} args={[0.6, 32, 32]}>
            <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.1} />
          </Sphere>
          <Sphere position={[0.65, 0.05, -0.1]} args={[0.65, 32, 32]}>
            <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.3} />
          </Sphere>
        </group>

        {/* If Rain or Thunderstorm, render 3D Falling Rain Cones / Bolts underneath */}
        {isRain && (
          <group position={[0, -0.9, 0]}>
            <Cone position={[-0.4, 0, 0]} args={[0.08, 0.3, 8]} rotation={[Math.PI, 0, 0]}>
              <meshBasicMaterial color="#60a5fa" />
            </Cone>
            <Cone position={[0.3, -0.2, 0.2]} args={[0.08, 0.3, 8]} rotation={[Math.PI, 0, 0]}>
              <meshBasicMaterial color="#38bdf8" />
            </Cone>
            <Cone position={[0, -0.1, -0.3]} args={[0.08, 0.3, 8]} rotation={[Math.PI, 0, 0]}>
              <meshBasicMaterial color="#93c5fd" />
            </Cone>
          </group>
        )}
      </group>
    );
  }

  // 3. Snow 3D Crystalline Sculpture
  return (
    <group ref={groupRef} scale={[1, 1, 1]}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 4, 3]} intensity={2.5} color="#e0f2fe" />

      {/* Central Snow Crystal Sphere */}
      <Sphere args={[0.6, 32, 32]}>
        <meshStandardMaterial color="#ffffff" emissive="#bae6fd" emissiveIntensity={0.6} roughness={0.1} />
      </Sphere>

      {/* Intersecting Torus Rings simulating a crystalline snowflake structure */}
      <Torus ref={ringRef} args={[1.1, 0.06, 16, 32]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#38bdf8" emissive="#7dd3fc" emissiveIntensity={1} />
      </Torus>
      <Torus args={[1.1, 0.06, 16, 32]} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#60a5fa" emissive="#bae6fd" emissiveIntensity={1} />
      </Torus>
    </group>
  );
};
