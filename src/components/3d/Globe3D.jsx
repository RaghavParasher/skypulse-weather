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

// Procedural fallback texture generator in case of slow network or offline mode
const createProceduralEarthTexture = (isDay) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep ocean gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  if (isDay) {
    grad.addColorStop(0, '#0284c7');
    grad.addColorStop(0.5, '#0369a1');
    grad.addColorStop(1, '#075985');
  } else {
    grad.addColorStop(0, '#040d21');
    grad.addColorStop(0.5, '#081736');
    grad.addColorStop(1, '#0c2352');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Draw lat/lon holographic grid lines
  ctx.strokeStyle = isDay ? 'rgba(255, 255, 255, 0.15)' : 'rgba(56, 189, 248, 0.22)';
  ctx.lineWidth = 1.5;
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * 512;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * 1024;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }

  // Draw stylized continent bands and glowing points
  ctx.fillStyle = isDay ? 'rgba(16, 185, 129, 0.45)' : 'rgba(30, 64, 175, 0.55)';
  // North America & Europe/Asia rough organic bands
  ctx.beginPath();
  ctx.arc(250, 160, 90, 0, Math.PI * 2);
  ctx.arc(580, 150, 130, 0, Math.PI * 2);
  ctx.arc(330, 340, 70, 0, Math.PI * 2);
  ctx.arc(620, 320, 80, 0, Math.PI * 2);
  ctx.arc(850, 360, 60, 0, Math.PI * 2);
  ctx.fill();

  // If night, add glowing city lights dots across continents
  if (!isDay) {
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 8;
    for (let i = 0; i < 350; i++) {
      const cx = (Math.sin(i * 99) * 0.5 + 0.5) * 1024;
      const cy = (Math.cos(i * 33) * 0.35 + 0.45) * 512;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
};

export const Globe3D = ({ latitude = 40.71, longitude = -74.01, locationName = 'New York', isDay = true }) => {
  const globeRef = useRef();
  const cloudsRef = useRef();
  const atmosphereRef = useRef();

  // Default procedural textures so globe is immediately colorful and detailed (never white!)
  const proceduralDay = useMemo(() => createProceduralEarthTexture(true), []);
  const proceduralNight = useMemo(() => createProceduralEarthTexture(false), []);

  const [textures, setTextures] = useState({
    day: proceduralDay,
    night: proceduralNight,
    clouds: null,
    normal: null,
  });

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'Anonymous';

    // Reliable origin path calculation for GitHub Pages repo root or local dev
    const repoBasePath = window.location.pathname.includes('/skypulse-weather')
      ? `${window.location.origin}/skypulse-weather/textures/`
      : `${window.location.origin}/textures/`;

    const loadTexWithFallback = (localName, unpkgCdnUrl, fallbackTex) =>
      new Promise((resolve) => {
        // Try exact root path first
        loader.load(
          `${repoBasePath}${localName}`,
          (tex) => resolve(tex),
          undefined,
          () => {
            // Try unpkg CORS-friendly CDN next
            loader.load(
              unpkgCdnUrl,
              (tex) => resolve(tex),
              undefined,
              () => resolve(fallbackTex)
            );
          }
        );
      });

    Promise.all([
      loadTexWithFallback('earth_day.jpg', 'https://unpkg.com/three-globe@2.31.1/example/img/earth-day.jpg', proceduralDay),
      loadTexWithFallback('earth_night.png', 'https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg', proceduralNight),
      loadTexWithFallback('earth_clouds.png', 'https://unpkg.com/three-globe@2.31.1/example/img/earth-clouds.png', null),
      loadTexWithFallback('earth_normal.jpg', 'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png', null),
    ]).then(([day, night, clouds, normal]) => {
      setTextures({ day: day || proceduralDay, night: night || proceduralNight, clouds, normal });
    });
  }, [proceduralDay, proceduralNight]);

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
      <ambientLight intensity={isDay ? 2.5 : 2.0} />
      <directionalLight
        position={[6, 5, 6]}
        intensity={isDay ? 3.5 : 2.2}
        color={isDay ? '#ffffff' : '#60a5fa'}
      />
      <pointLight position={[-6, -4, -6]} intensity={1.8} color="#38bdf8" />
      <pointLight position={[0, 6, 0]} intensity={1.2} color="#a855f7" />

      {/* Main Globe Group */}
      <group ref={globeRef}>
        {/* Core Earth Sphere (Real Continents Map, Oceans & Night City Lights) */}
        <Sphere args={[2, 64, 64]}>
          <meshStandardMaterial
            map={isDay ? textures.day : textures.night}
            normalMap={textures.normal || null}
            normalScale={new THREE.Vector2(0.6, 0.6)}
            emissiveMap={!isDay && textures.night ? textures.night : null}
            emissive={!isDay && textures.night ? '#ffffff' : '#000000'}
            emissiveIntensity={!isDay && textures.night ? 0.7 : 0}
            color={!textures.day ? (isDay ? '#0284c7' : '#0f172a') : '#ffffff'}
            roughness={0.35}
            metalness={0.15}
          />
        </Sphere>

        {/* High-Tech Holographic Lat-Long Wireframe Layer */}
        <Sphere args={[2.015, 32, 32]}>
          <meshBasicMaterial
            color={isDay ? '#7dd3fc' : '#38bdf8'}
            wireframe={true}
            transparent={true}
            opacity={0.15}
          />
        </Sphere>

        {/* Outer Drifting Atmosphere Cloud Layer (Real Cloud Cover) */}
        <Sphere ref={cloudsRef} args={[2.04, 32, 32]}>
          <meshStandardMaterial
            map={textures.clouds || null}
            color={textures.clouds ? '#ffffff' : '#7dd3fc'}
            transparent={true}
            opacity={textures.clouds ? 0.32 : 0.05}
            roughness={0.8}
            emissive="#000000"
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
