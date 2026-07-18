import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Convert latitude and longitude to 3D Cartesian coordinates on a sphere of given radius
const latLongToVector3 = (lat, lon, radius = 2) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

export const Globe3D = ({ latitude = 40.71, longitude = -74.01, locationName = 'New York', isDay = true }) => {
  const globeRef = useRef();
  const cloudsRef = useRef();
  const atmosphereRef = useRef();

  // Calculate pin position precisely on the surface of radius 2
  const pinPos = useMemo(() => latLongToVector3(latitude, longitude, 2.05), [latitude, longitude]);

  // Generate wireframe lat-long procedural lines for high-tech holographic look
  const gridPoints = useMemo(() => {
    const points = [];
    const radius = 2.01;
    // Latitude rings
    for (let lat = -80; lat <= 80; lat += 20) {
      const phi = (90 - lat) * (Math.PI / 180);
      for (let lon = 0; lon <= 360; lon += 5) {
        const theta = lon * (Math.PI / 180);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);
        points.push(new THREE.Vector3(x, y, z));
      }
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (globeRef.current) {
      // Gentle auto-rotation around Y axis plus subtle bobbing
      globeRef.current.rotation.y += delta * 0.12;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.18;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group>
      {/* Interactive Orbit Controls for user spinning and zooming */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3.2}
        maxDistance={6.5}
        autoRotate={false}
        dampingFactor={0.05}
      />

      {/* Dynamic Lighting */}
      <ambientLight intensity={isDay ? 1.2 : 0.6} />
      <directionalLight
        position={[6, 4, 5]}
        intensity={isDay ? 2.5 : 0.8}
        color={isDay ? '#ffffff' : '#93c5fd'}
      />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#3b82f6" />

      {/* Main Globe Group */}
      <group ref={globeRef}>
        {/* Core Earth Sphere (Deep Holographic Blue/Midnight) */}
        <Sphere args={[2, 64, 64]}>
          <meshStandardMaterial
            color={isDay ? '#0f172a' : '#020617'}
            roughness={0.3}
            metalness={0.8}
            emissive={isDay ? '#1e3a8a' : '#172554'}
            emissiveIntensity={0.35}
          />
        </Sphere>

        {/* High-Tech Holographic Lat-Long Wireframe Layer */}
        <Sphere args={[2.015, 32, 32]}>
          <meshBasicMaterial
            color={isDay ? '#38bdf8' : '#60a5fa'}
            wireframe={true}
            transparent={true}
            opacity={0.15}
          />
        </Sphere>

        {/* Outer Drifting Atmosphere Cloud Layer */}
        <Sphere ref={cloudsRef} args={[2.04, 32, 32]}>
          <meshStandardMaterial
            color="#ffffff"
            transparent={true}
            opacity={0.12}
            roughness={0.9}
          />
        </Sphere>

        {/* Glowing Atmospheric Aura Sphere */}
        <Sphere ref={atmosphereRef} args={[2.12, 32, 32]}>
          <meshBasicMaterial
            color={isDay ? '#3b82f6' : '#6366f1'}
            transparent={true}
            opacity={0.08}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Location Pin & Marker Pulse on the Globe Surface */}
        <group position={[pinPos.x, pinPos.y, pinPos.z]}>
          {/* Glowing Pin Cylinder/Cone */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#f43f5e"
              emissive="#fb7185"
              emissiveIntensity={1.5}
              roughness={0.1}
            />
          </mesh>

          {/* Pulsing Aura Ring around Pin */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.12, 0.18, 32]} />
            <meshBasicMaterial color="#fb7185" transparent={true} opacity={0.6} side={THREE.DoubleSide} />
          </mesh>

          {/* Floating HTML Label above Pin */}
          <Html position={[0, 0.25, 0]} center distanceFactor={8}>
            <div className="px-3 py-1 rounded-full bg-slate-900/90 border border-blue-400/60 text-white font-extrabold text-xs shadow-2xl backdrop-blur-md whitespace-nowrap flex items-center space-x-1.5 animate-bounce">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>{locationName}</span>
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
};
