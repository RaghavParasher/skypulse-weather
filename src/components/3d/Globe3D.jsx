import React, { useRef, useMemo, useState, useEffect } from 'react';
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

  const [textures, setTextures] = useState({
    day: null,
    night: null,
    clouds: null,
    normal: null,
  });

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const loadTex = (url) =>
      new Promise((resolve) => {
        loader.load(url, (tex) => resolve(tex), undefined, () => resolve(null));
      });

    Promise.all([
      loadTex('./textures/earth_day.jpg'),
      loadTex('./textures/earth_night.png'),
      loadTex('./textures/earth_clouds.png'),
      loadTex('./textures/earth_normal.jpg'),
    ]).then(([day, night, clouds, normal]) => {
      setTextures({ day, night, clouds, normal });
    });
  }, []);

  // Calculate pin position precisely on the surface of radius 2
  const pinPos = useMemo(() => latLongToVector3(latitude, longitude, 2.05), [latitude, longitude]);

  useFrame((state, delta) => {
    if (globeRef.current) {
      // Gentle auto-rotation around Y axis plus subtle bobbing
      globeRef.current.rotation.y += delta * 0.15;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.22;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group>
      {/* Interactive Orbit Controls for user spinning and zooming */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3.0}
        maxDistance={6.5}
        autoRotate={false}
        dampingFactor={0.05}
      />

      {/* High-Intensity Dynamic Lighting for Maximum Contrast & Glow */}
      <ambientLight intensity={isDay ? 2.5 : 1.8} />
      <directionalLight
        position={[6, 5, 6]}
        intensity={isDay ? 3.8 : 2.5}
        color={isDay ? '#ffffff' : '#60a5fa'}
      />
      <pointLight position={[-6, -4, -6]} intensity={1.8} color="#38bdf8" />
      <pointLight position={[0, 6, 0]} intensity={1.2} color="#a855f7" />

      {/* Main Globe Group */}
      <group ref={globeRef}>
        {/* Core Earth Sphere (Real Continents Map, Oceans & Night City Lights) */}
        <Sphere args={[2, 64, 64]}>
          <meshStandardMaterial
            map={isDay ? (textures.day || null) : (textures.night || null)}
            normalMap={textures.normal || null}
            normalScale={new THREE.Vector2(0.5, 0.5)}
            emissiveMap={isDay ? null : (textures.night || null)}
            emissive={isDay ? '#000000' : '#ffffff'}
            emissiveIntensity={isDay ? 0 : 0.85}
            color={!textures.day ? (isDay ? '#0284c7' : '#1e3a8a') : '#ffffff'}
            roughness={0.4}
            metalness={0.2}
          />
        </Sphere>

        {/* High-Tech Holographic Lat-Long Wireframe Layer */}
        <Sphere args={[2.015, 32, 32]}>
          <meshBasicMaterial
            color={isDay ? '#7dd3fc' : '#38bdf8'}
            wireframe={true}
            transparent={true}
            opacity={0.18}
          />
        </Sphere>

        {/* Outer Drifting Atmosphere Cloud Layer (Real Cloud Cover) */}
        <Sphere ref={cloudsRef} args={[2.04, 32, 32]}>
          <meshStandardMaterial
            map={textures.clouds || null}
            color="#ffffff"
            transparent={true}
            opacity={textures.clouds ? 0.65 : 0.25}
            roughness={0.8}
            emissive="#ffffff"
            emissiveIntensity={0.15}
          />
        </Sphere>

        {/* Glowing Atmospheric Halo Ring Sphere */}
        <Sphere ref={atmosphereRef} args={[2.16, 32, 32]}>
          <meshBasicMaterial
            color={isDay ? '#38bdf8' : '#818cf8'}
            transparent={true}
            opacity={0.28}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Location Pin & Marker Pulse on the Globe Surface */}
        <group position={[pinPos.x, pinPos.y, pinPos.z]}>
          {/* Glowing Pin Cylinder/Cone */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#f43f5e"
              emissive="#fb7185"
              emissiveIntensity={2.0}
              roughness={0.1}
            />
          </mesh>

          {/* Pulsing Aura Ring around Pin */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.14, 0.22, 32]} />
            <meshBasicMaterial color="#fb7185" transparent={true} opacity={0.85} side={THREE.DoubleSide} />
          </mesh>

          {/* Floating HTML Label above Pin */}
          <Html position={[0, 0.3, 0]} center distanceFactor={8}>
            <div className="px-3.5 py-1.5 rounded-full bg-slate-950/95 border border-blue-400/80 text-white font-black text-xs shadow-2xl backdrop-blur-md whitespace-nowrap flex items-center space-x-2 animate-bounce">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>{locationName}</span>
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
};
