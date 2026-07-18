import React from 'react';
import { Canvas } from '@react-three/fiber';
import { WeatherParticles3D } from './WeatherParticles3D';
import { useWeather } from '../../context/WeatherContext';
import { getWeatherMeta } from '../../services/weatherApi';

export const AtmosphericBackground3D = () => {
  const { weatherData } = useWeather();

  const current = weatherData?.current;
  const isDay = current ? current.is_day === 1 : true;
  const meta = current ? getWeatherMeta(current.weather_code, isDay) : { type: 'clear' };
  const windSpeed = current?.wind_speed_10m || 10;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={isDay ? 0.8 : 0.3} />
        <directionalLight position={[10, 10, 5]} intensity={isDay ? 1.5 : 0.5} />
        
        {/* Full-screen 3D atmospheric particle system */}
        <WeatherParticles3D
          weatherType={meta.type}
          windSpeed={windSpeed}
          count={1500}
        />
      </Canvas>
    </div>
  );
};
